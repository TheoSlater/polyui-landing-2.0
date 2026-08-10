# Poly UI docs portal design

## Goal

Add an in-site documentation experience to the existing Poly UI webpage. It must help users install and configure Poly UI, understand provider and permission behavior, and give contributors a practical developer reference.

## Product truth

- Poly UI is a React and Tauri desktop app for local models, hosted providers, and coding agents.
- Conversations use local SQLite storage. Provider credentials are kept in the operating system keychain.
- The AI runtime is a private Bun sidecar connected to the Rust host over JSONL stdin and stdout.
- Supported connection types include Ollama, LM Studio, OpenAI, Anthropic, Google Gemini, OpenRouter, Vercel AI Gateway, and OpenAI-compatible endpoints.
- Coding agents include Claude Code and Codex. Read-only behavior is the default, with workspace and terminal access controlled by explicit permissions.
- The landing site already uses a dark Poly UI visual language, Manrope for body text, General Sans for headings, JetBrains Mono for code, and a restrained violet accent.

## Information architecture

The docs use two navigation groups:

### Use Poly UI

- Overview
- Install Poly UI
- First run
- Providers
- Custom providers
- Coding agents
- Workspace access and sandbox
- Web search and citations
- Data and privacy
- Troubleshooting

### Build Poly UI

- Developer overview
- Development setup
- Architecture
- Add a provider
- Custom views
- Testing and releases

Each page is a local Markdown file under `src/content/docs/`. A typed page registry owns title, description, navigation group, and route slug.

## Routing and rendering

The docs are rendered by the existing Vite React app. Hash routes use `#/docs/<slug>` so the site works on static hosts without a server rewrite. The landing route remains unchanged.

Vite's `import.meta.glob` loads Markdown files at build time. `marked` renders trusted local Markdown with GitHub-flavored syntax. A small post-processing step converts GitHub-style `[!NOTE]`, `[!TIP]`, `[!WARNING]`, and `[!IMPORTANT]` blockquotes into semantic callouts.

## Layout

- Docs header: Poly UI mark, Docs label, search, back-to-home link, and GitHub link.
- Desktop: sticky grouped sidebar, article column capped at a comfortable reading measure, and an on-page heading outline.
- Mobile: a native page selector replaces the sidebar and the article fills the viewport.
- Page footer: previous and next page links within the active group.
- Search: client-side filtering across titles, descriptions, and Markdown source. Results link directly to the hash route.

## Visual and interaction decisions

- Inherit the landing page's dark theme and existing tokens.
- Keep motion limited to focus, hover, and small route transitions. Respect reduced motion in CSS.
- Use borders and spacing to organize content. Avoid decorative cards, gradients, fake product UI, and decorative status dots.
- Keep visible copy sentence case and avoid em-dashes.
- Preserve the existing landing page's navigation, hero, download flow, and footer behavior.

## Acceptance criteria

- The header's Docs link opens the in-site docs route.
- At least fifteen useful pages exist across both documentation groups.
- Markdown supports headings, paragraphs, lists, links, tables, inline code, fenced code blocks, and callout banners.
- Search, grouped navigation, mobile page selection, previous and next links, and heading navigation work with keyboard input.
- The docs layout is usable at desktop and mobile widths.
- Existing landing content remains intact.
- Typecheck, production build, tests, and the Impeccable detector pass without introducing visible em-dashes.
