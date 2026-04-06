import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";

const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");
const SUPPORTED_EXTENSIONS = new Set([".pdf", ".docx", ".md", ".txt"]);
const MAX_RESULTS = 6;
const CHUNK_SIZE = 1400;
const CHUNK_OVERLAP = 220;
const MIN_USEFUL_SCORE = 8;

type KnowledgeChunk = {
  id: string;
  fileName: string;
  relativePath: string;
  text: string;
};

export type KnowledgeMatch = {
  fileName: string;
  relativePath: string;
  text: string;
  score: number;
};

type CachedKnowledge = {
  signature: string;
  chunks: KnowledgeChunk[];
};

let knowledgeCache: CachedKnowledge | null = null;

function normalizeText(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function chunkText(text: string) {
  const normalized = normalizeText(text);

  if (!normalized) {
    return [];
  }

  const chunks: string[] = [];
  let start = 0;

  while (start < normalized.length) {
    const end = Math.min(start + CHUNK_SIZE, normalized.length);
    const slice = normalized.slice(start, end).trim();

    if (slice) {
      chunks.push(slice);
    }

    if (end >= normalized.length) {
      break;
    }

    start = Math.max(end - CHUNK_OVERLAP, start + 1);
  }

  return chunks;
}

async function readPdf(filePath: string) {
  const { PDFParse } = await import("pdf-parse");
  const buffer = await fs.readFile(filePath);
  const workerPath = path.join(
    process.cwd(),
    "node_modules",
    "pdf-parse",
    "dist",
    "worker",
    "pdf.worker.mjs"
  );

  PDFParse.setWorker(pathToFileURL(workerPath).toString());
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return normalizeText(result.text);
  } finally {
    await parser.destroy();
  }
}

async function readDocx(filePath: string) {
  const mammoth = await import("mammoth");
  const buffer = await fs.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer });

  return normalizeText(result.value);
}

async function readTextFile(filePath: string) {
  const text = await fs.readFile(filePath, "utf8");

  return normalizeText(text);
}

async function extractFileText(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".pdf") {
    return readPdf(filePath);
  }

  if (extension === ".docx") {
    return readDocx(filePath);
  }

  return readTextFile(filePath);
}

async function listKnowledgeFiles() {
  try {
    const entries = await fs.readdir(KNOWLEDGE_DIR, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => !/^readme(\.[^.]+)?$/i.test(name))
      .filter((name) => SUPPORTED_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort();
  } catch {
    return [];
  }
}

async function buildKnowledgeSignature(fileNames: string[]) {
  const parts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(KNOWLEDGE_DIR, fileName);
      const stat = await fs.stat(filePath);

      return `${fileName}:${stat.mtimeMs}:${stat.size}`;
    })
  );

  return parts.join("|");
}

async function loadKnowledgeChunks() {
  const fileNames = await listKnowledgeFiles();

  if (!fileNames.length) {
    knowledgeCache = {
      signature: "",
      chunks: []
    };

    return knowledgeCache.chunks;
  }

  const signature = await buildKnowledgeSignature(fileNames);

  if (knowledgeCache?.signature === signature) {
    return knowledgeCache.chunks;
  }

  const chunks: KnowledgeChunk[] = [];

  for (const fileName of fileNames) {
    const filePath = path.join(KNOWLEDGE_DIR, fileName);
    try {
      const text = await extractFileText(filePath);
      const fileChunks = chunkText(text);

      fileChunks.forEach((chunk, index) => {
        chunks.push({
          id: `${fileName}-${index}`,
          fileName,
          relativePath: path.join("knowledge", fileName),
          text: chunk
        });
      });
    } catch (error) {
      console.error(`Failed to parse knowledge file: ${fileName}`, error);
    }
  }

  knowledgeCache = {
    signature,
    chunks
  };

  return chunks;
}

function scoreChunk(query: string, chunk: KnowledgeChunk) {
  const queryTokens = tokenize(query);

  if (!queryTokens.length) {
    return 0;
  }

  const chunkTokens = new Set(tokenize(chunk.text));
  const fileName = chunk.fileName.toLowerCase();
  const loweredQuery = query.toLowerCase();
  let score = 0;

  queryTokens.forEach((token) => {
    if (chunkTokens.has(token)) {
      score += 2;
    }

    if (fileName.includes(token)) {
      score += 3;
    }
  });

  if (chunk.text.toLowerCase().includes(loweredQuery)) {
    score += 4;
  }

  return score;
}

export async function searchKnowledgeBase(query: string) {
  const chunks = await loadKnowledgeChunks();

  if (!chunks.length) {
    return {
      matches: [] as KnowledgeMatch[],
      hasDocuments: false,
      shouldUseKnowledge: false
    };
  }

  const rankedMatches = chunks
    .map((chunk) => ({
      fileName: chunk.fileName,
      relativePath: chunk.relativePath,
      text: chunk.text,
      score: scoreChunk(query, chunk)
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, MAX_RESULTS);

  const shouldUseKnowledge =
    rankedMatches.length > 0 && (rankedMatches[0]?.score ?? 0) >= MIN_USEFUL_SCORE;

  return {
    matches: rankedMatches,
    hasDocuments: true,
    shouldUseKnowledge
  };
}
