export const preferredWebSources = [
  "tcd.ie",
  "ucd.ie",
  "ucc.ie",
  "universityofgalway.ie",
  "maynoothuniversity.ie",
  "dcu.ie",
  "ul.ie",
  "tudublin.ie",
  "cao.ie",
  "ireland.ie",
  "irishimmigration.ie",
  "visas.inis.gov.ie",
  "visa.vfsglobal.com",
  "india.gov.in",
  "mea.gov.in",
  "ugc.ac.in",
  "aiu.ac.in",
  "garda.ie",
  "mywelfare.ie",
  "mygovid.ie",
  "centralbank.ie",
  "aib.ie",
  "bankofireland.com",
  "vhi.ie",
  "layahealthcare.ie",
  "irishlifehealth.ie",
  "sbi.co.in",
  "canarabank.com",
  "vodafone.ie",
  "three.ie",
  "eir.ie",
  "virginmedia.ie",
  "tescomobile.ie",
  "lycamobile.ie",
  "48.ie",
  "iaa.ie",
  "dublinairport.com",
  "aerlingus.com",
  "free-now.com",
  "uber.com",
  "bolt.eu",
  "daft.ie",
  "rent.ie",
  "myhome.ie",
  "gov.ie",
  "buseireann.ie",
  "dublinbus.ie",
  "irishrail.ie",
  "luas.ie",
  "rsa.ie",
  "ndls.ie",
  "passportindia.gov.in",
  "mportal.passportindia.gov.in",
  "bankofbaroda.in",
  "pnbindia.in",
  "unionbankofindia.co.in",
  "bankofindia.co.in",
  "indianbank.in",
  "iob.in",
  "idbibank.in",
  "psbindia.com",
  "dcbbank.com",
  "icicibank.com",
  "credila.hdfcbank.com",
  "axisbank.com",
  "yesbank.in",
  "indusind.com",
  "idfcfirstbank.com",
  "tatacapital.com",
  "avanse.com",
  "prodigyfinance.com",
  "vidyalakshmi.co.in",
  "ieltsidpindia.com",
  "ielts.org",
  "englishtest.duolingo.com",
  "idp.com",
  "met.edu",
  "kanan.co",
  "manhattanreview.com",
  "pw.live",
  "detpractice.com",
  "wh.xhd.cn",
  "pagalguy.com",
  "asksia.ai",
  "wemakescholars.com",
  "propelld.com",
  "bankbazaar.com",
  "nomadcredit.com",
  "elanloans.com"
];

export const blockedConsultancyDomains = [
  "yocket.com",
  "leapscholar.com",
  "upgradabroad.com",
  "collegedunia.com",
  "shiksha.com",
  "si-uk.com",
  "studyin-ireland.com"
];

export function formatPreferredSourcesForPrompt() {
  if (!preferredWebSources.length) {
    return "";
  }

  return preferredWebSources.map((domain) => `- ${domain}`).join("\n");
}

export function formatBlockedSourcesForPrompt() {
  if (!blockedConsultancyDomains.length) {
    return "";
  }

  return blockedConsultancyDomains.map((domain) => `- ${domain}`).join("\n");
}
