import { GithubIcon } from "@/components/GithubIcon";

const productLinks = [
  ["Models", "#providers"],
  ["Agent Mode", "#agents"],
  ["Browser", "#browser"],
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-40">
        <div className="grid gap-16 sm:grid-cols-2 md:grid-cols-[1.5fr_0.75fr_0.75fr]">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <img
                src="/polyui-icon.png"
                alt=""
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                className="size-7"
              />
              <span className="text-sm font-semibold tracking-tight">Poly UI</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              One focused desktop workspace for your models, files, agents, and
              the web.
            </p>
          </div>

          <nav aria-label="Product">
            <p className="text-sm font-medium">Product</p>
            <div className="mt-5 flex flex-col items-start gap-3">
              {productLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <nav aria-label="Project">
            <p className="text-sm font-medium">Project</p>
            <a
              href="https://github.com/monolabsdev/poly-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-28 flex flex-col gap-3 border-t border-border/60 py-7 text-xs text-muted-foreground sm:mt-36 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} Poly UI.</p>
          <p>Open source desktop software.</p>
        </div>

        <div
          aria-hidden="true"
          className="-mb-[0.16em] select-none whitespace-nowrap text-center font-heading text-[clamp(5rem,18vw,14rem)] font-medium leading-[0.78] tracking-[-0.04em] text-foreground/[0.035]"
        >
          Poly UI
        </div>
      </div>
    </footer>
  );
}
