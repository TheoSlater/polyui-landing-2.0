import { Download } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { BlurIn } from "@/components/BlurIn";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Providers", href: "#providers" },
  {
    label: "Docs",
    href: "https://github.com/monolabsdev/poly-ui#readme",
    external: true,
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-page/85 backdrop-blur-md">
      <BlurIn className="mx-auto flex h-13 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight">Poly UI</span>
        </a>

        <nav className="mx-auto hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon-sm" render={<a href="https://github.com/monolabsdev/poly-ui" target="_blank" rel="noopener noreferrer" aria-label="GitHub" />} nativeButton={false}>
            <GithubIcon size={14} />
          </Button>
          <Button size="sm" render={<a href="#downloads" />} nativeButton={false}>
            <Download data-icon="inline-start" size={14} />
            Download
          </Button>
        </div>
      </BlurIn>
    </header>
  );
}
