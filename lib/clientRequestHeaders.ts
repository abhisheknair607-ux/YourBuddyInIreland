import { getMockUser } from "@/lib/mockAuth";

type PreviewHeaderUser = {
  email?: string | null;
  name?: string | null;
};

export function getClientRequestHeaders(previewUser?: PreviewHeaderUser) {
  const headers: Record<string, string> = {};
  const deploymentId = process.env.NEXT_PUBLIC_DEPLOYMENT_ID;

  if (deploymentId) {
    headers["x-deployment-id"] = deploymentId;
  }

  const headerUser =
    previewUser?.email || previewUser?.name ? previewUser : getMockUser();

  if (headerUser?.email) {
    headers["x-guidon-preview-email"] = headerUser.email;
    headers["x-guidon-preview-name"] = headerUser.name ?? "";
  }

  return headers;
}
