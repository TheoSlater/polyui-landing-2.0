export function docsRoute(slug: string) {
  return "#/docs/" + slug;
}

export function getDocsSlug(hash: string) {
  if (!hash.startsWith("#/docs")) return "overview";
  return hash.slice("#/docs".length).split("#")[0].replace(/^\/+/, "") || "overview";
}
