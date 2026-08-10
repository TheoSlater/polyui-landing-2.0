import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Search, X } from "lucide-react";
import { marked } from "marked";
import { GithubIcon } from "@/components/GithubIcon";
import { docs, docsBySlug, docsGroups, type DocsEntry } from "@/content/docs";
import { docsRoute } from "@/lib/docsRoute";
import "./docs.css";

const landingTitle = "Poly UI · One interface for every AI model";
const calloutLabels = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
  important: "Important",
  caution: "Caution",
} as const;

type CalloutKind = keyof typeof calloutLabels;

type Heading = {
  id: string;
  title: string;
  depth: 2 | 3;
};

function slugify(value: string) {
  const text = value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "")
    .replace(/&#39;/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return text || "section";
}

function uniqueId(value: string, used: Map<string, number>) {
  const base = slugify(value);
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count === 0 ? base : base + "-" + (count + 1);
}

function getHeadings(markdown: string): Heading[] {
  const used = new Map<string, number>();
  return markdown.split(/\r?\n/).reduce<Heading[]>((result, line) => {
    const match = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!match) return result;
    const depth = match[1].length as 2 | 3;
    result.push({ id: uniqueId(match[2], used), title: match[2], depth });
    return result;
  }, []);
}

function renderMarkdown(markdown: string) {
  const parsed = String(marked.parse(markdown, { gfm: true }));
  const withCallouts = parsed.replace(
    /<blockquote>\s*<p>\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/gi,
    (_match: string, rawKind: string, body: string) => {
      const kind = rawKind.toLowerCase() as CalloutKind;
      const label = calloutLabels[kind];
      return (
        '<aside class="docs-callout docs-callout-' +
        kind +
        '" role="note" aria-label="' +
        label +
        '">' +
        '<span class="docs-callout-label">' +
        label +
        "</span><p>" +
        body.trim() +
        "</p></aside>"
      );
    },
  );

  const used = new Map<string, number>();
  return withCallouts.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match: string, level: string, inner: string) =>
      '<h' +
      level +
      ' id="' +
      uniqueId(inner, used) +
      '">' +
      inner +
      "</h" +
      level +
      ">",
  );
}

function groupPages(group: DocsEntry["group"]) {
  return docs.filter((entry) => entry.group === group);
}

export function DocsPage({ slug }: { slug: string }) {
  const page = docsBySlug.get(slug) ?? docs[0];
  const [query, setQuery] = useState("");
  const headings = useMemo(() => getHeadings(page.content), [page.content]);
  const html = useMemo(() => renderMarkdown(page.content), [page.content]);
  const pageEntries = useMemo(() => groupPages(page.group), [page.group]);
  const pageIndex = pageEntries.findIndex((entry) => entry.slug === page.slug);
  const previous = pageEntries[pageIndex - 1];
  const next = pageEntries[pageIndex + 1];
  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return docs.filter((entry) =>
      [entry.title, entry.description, entry.content].join(" ").toLowerCase().includes(normalized),
    ).slice(0, 7);
  }, [query]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = page.title + " | Poly UI Docs";
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.title = previousTitle || landingTitle;
    };
  }, [page.slug, page.title]);

  return (
    <div className="docs-page">
      <a className="docs-skip-link" href={docsRoute(page.slug) + "#docs-content"}>Skip to documentation</a>

      <header className="docs-header">
        <div className="docs-header-inner">
          <a className="docs-brand" href="/" aria-label="Poly UI home">
            <img src="/polyui-icon.png" alt="" width={24} height={24} />
            <span>Poly UI</span>
            <span className="docs-brand-divider" aria-hidden="true">/</span>
            <span className="docs-brand-current">Docs</span>
          </a>

          <div className="docs-header-actions">
            <div className="docs-search-wrap">
              <label className="docs-search">
                <Search size={15} aria-hidden="true" />
                <span className="sr-only">Search documentation</span>
                <input
                  type="search"
                  value={query}
                  placeholder="Search docs"
                  onChange={(event) => setQuery(event.target.value)}
                />
                {query ? (
                  <button
                    type="button"
                    className="docs-search-clear"
                    aria-label="Clear documentation search"
                    onClick={() => setQuery("")}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                ) : null}
              </label>
              {query.trim() ? (
                <div className="docs-search-results" role="listbox" aria-label="Documentation search results">
                  {matches.length ? matches.map((entry) => (
                    <a
                      key={entry.slug}
                      href={docsRoute(entry.slug)}
                      role="option"
                      aria-selected={entry.slug === page.slug}
                      onClick={() => setQuery("")}
                    >
                      <span>{entry.title}</span>
                      <small>{entry.group}</small>
                    </a>
                  )) : (
                    <p>No matching pages.</p>
                  )}
                </div>
              ) : null}
            </div>
            <a className="docs-header-link" href="/">Back to site</a>
            <a
              className="docs-github-link"
              href="https://github.com/monolabsdev/poly-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Poly UI on GitHub"
            >
              <GithubIcon size={15} />
            </a>
          </div>
        </div>
      </header>

      <div className="docs-layout">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <div className="docs-sidebar-intro">
            <span className="docs-sidebar-icon" aria-hidden="true"><BookOpen size={16} /></span>
            <p className="docs-sidebar-label">Documentation</p>
            <p className="docs-sidebar-title">Poly UI docs</p>
            <p>Install, configure, and build with the workspace.</p>
          </div>

          <nav className="docs-nav">
            {docsGroups.map((group) => (
              <div className="docs-nav-group" key={group}>
                <h2>{group}</h2>
                <div>
                  {groupPages(group).map((entry) => (
                    <a
                      key={entry.slug}
                      className={"docs-nav-link" + (entry.slug === page.slug ? " is-active" : "")}
                      href={docsRoute(entry.slug)}
                      aria-current={entry.slug === page.slug ? "page" : undefined}
                    >
                      {entry.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <main className="docs-main" id="docs-content" tabIndex={-1}>
          <label className="docs-mobile-select">
            <span>Jump to a page</span>
            <select
              value={page.slug}
              onChange={(event) => {
                window.location.hash = docsRoute(event.target.value);
              }}
            >
              {docsGroups.map((group) => (
                <optgroup key={group} label={group}>
                  {groupPages(group).map((entry) => (
                    <option key={entry.slug} value={entry.slug}>{entry.title}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <div className="docs-content-grid">
            <article className="docs-article">
              <div className="docs-breadcrumb">
                <span>{page.group}</span>
                <span aria-hidden="true">/</span>
                <span>{page.title}</span>
              </div>
              <h1>{page.title}</h1>
              <p className="docs-article-description">{page.description}</p>
              <div className="docs-markdown" dangerouslySetInnerHTML={{ __html: html }} />

              <nav className="docs-pager" aria-label="More documentation">
                {previous ? (
                    <a href={docsRoute(previous.slug)} className="docs-pager-link docs-pager-previous">
                    <ArrowLeft size={15} aria-hidden="true" />
                    <span><small>Previous</small><strong>{previous.title}</strong></span>
                  </a>
                ) : <span />}
                {next ? (
                    <a href={docsRoute(next.slug)} className="docs-pager-link docs-pager-next">
                    <span><small>Next</small><strong>{next.title}</strong></span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                ) : <span />}
              </nav>
            </article>

            {headings.length ? (
              <aside className="docs-toc" aria-label="On this page">
                <p>On this page</p>
                <nav>
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      className={heading.depth === 3 ? "is-nested" : undefined}
                      href={docsRoute(page.slug) + "#" + heading.id}
                    >
                      {heading.title}
                    </a>
                  ))}
                </nav>
              </aside>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
