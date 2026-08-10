export type DocsGroup = "Use Poly UI" | "Build Poly UI";

export type DocsEntry = {
  slug: string;
  title: string;
  description: string;
  group: DocsGroup;
  content: string;
};

const files = import.meta.glob("./docs/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function page(
  slug: string,
  title: string,
  description: string,
  group: DocsGroup,
  file: string,
): DocsEntry {
  const content = files[`./docs/${file}.md`];
  if (!content) throw new Error(`Missing docs content: ${file}`);
  return { slug, title, description, group, content };
}

export const docs = [
  page("overview", "Poly UI docs", "Start with the workspace, then choose how your models and tools should run.", "Use Poly UI", "overview"),
  page("install", "Install Poly UI", "Download a release or run Poly UI from source.", "Use Poly UI", "install"),
  page("first-run", "First run", "Set up a local profile, provider, access level, and appearance.", "Use Poly UI", "first-run"),
  page("providers", "Providers", "Connect cloud APIs, local model servers, and coding agents.", "Use Poly UI", "providers"),
  page("custom-providers", "Custom providers", "Connect an OpenAI-compatible endpoint that Poly UI does not list by name.", "Use Poly UI", "custom-providers"),
  page("coding-agents", "Coding agents", "Use Claude Code and Codex with their existing CLI sign-in.", "Use Poly UI", "coding-agents"),
  page("workspace-access", "Workspace access and sandbox", "Understand folders, approvals, and the isolated terminal.", "Use Poly UI", "workspace-access"),
  page("web-search", "Web search and citations", "Add current web context while keeping the provider choice explicit.", "Use Poly UI", "web-search"),
  page("data-privacy", "Data and privacy", "Know what stays on your device and what leaves it.", "Use Poly UI", "data-privacy"),
  page("troubleshooting", "Troubleshooting", "Fix the common setup, provider, model, and agent problems.", "Use Poly UI", "troubleshooting"),
  page("developer-overview", "Developer overview", "The shortest path from the repository to the right extension point.", "Build Poly UI", "developer-overview"),
  page("development-setup", "Development setup", "Install the toolchain and run the desktop app locally.", "Build Poly UI", "development-setup"),
  page("architecture", "Architecture", "Follow a request from the React interface to a provider or coding agent.", "Build Poly UI", "architecture"),
  page("add-provider", "Add a provider", "Extend the connection catalog without weakening the credential boundary.", "Build Poly UI", "add-provider"),
  page("custom-views", "Custom views", "Register a full-height view that keeps the chat state intact.", "Build Poly UI", "custom-views"),
  page("testing-releases", "Testing and releases", "Run the checks that protect the frontend, sidecar, Rust host, and installers.", "Build Poly UI", "testing-releases"),
] satisfies readonly DocsEntry[];

export const docsBySlug = new Map(docs.map((entry) => [entry.slug, entry]));

export const docsGroups = ["Use Poly UI", "Build Poly UI"] as const;
