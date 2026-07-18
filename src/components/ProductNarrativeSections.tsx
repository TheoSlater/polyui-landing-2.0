import {
  ArrowUpRight,
  Bot,
  Check,
  FileText,
  Globe2,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { GithubIcon } from "@/components/GithubIcon";
import { Button } from "@/components/ui/button";

const providers = ["OpenAI", "Anthropic", "Google", "Ollama"];

const features = [
  {
    icon: Sparkles,
    label: "Context",
    title: "Everything within reach.",
    copy: "Conversations, files, and instructions stay connected.",
  },
  {
    icon: FileText,
    label: "Files",
    title: "From question to artifact.",
    copy: "Bring documents into the work without breaking focus.",
  },
  {
    icon: Search,
    label: "Search",
    title: "Fresh context, on demand.",
    copy: "Search the web and keep evidence close to the answer.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 28, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export function ProductNarrativeSections() {
  return (
    <div className="pb-30 sm:pb-48">
      <motion.section
        id="providers"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <div className="grid items-end gap-10 md:grid-cols-2">
          <SectionHeading
            eyebrow="01 · Providers"
            title="Use the right model for the moment."
          />
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:justify-self-end">
            Bring cloud and local models into one focused conversation. Switch
            intelligence without switching your workspace.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4">
          {providers.map((provider, index) => (
            <div
              key={provider}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/30 px-4 py-4 sm:px-5"
            >
              <span className="flex size-7 items-center justify-center rounded-lg border border-border/70 bg-card font-mono text-[10px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium">{provider}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="features"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <SectionHeading
          eyebrow="02 · One workspace"
          title="Everything you need. Nothing in the way."
          className="max-w-2xl"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3 sm:mt-16">
          {features.map(({ icon: Icon, label, title, copy }) => (
            <article
              key={label}
              className="min-h-52 rounded-2xl border border-border/70 bg-background/30 p-6 sm:p-7"
            >
              <div className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-card text-muted-foreground">
                <Icon size={16} />
              </div>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
              <h3 className="mt-2 font-heading text-xl font-medium tracking-[-0.035em]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="agents"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionHeading
              eyebrow="03 · Agent mode"
              title="Delegate the work. Stay in control."
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Poly plans, researches, edits, and reports back in one traceable
              workspace. Every step stays visible.
            </p>
          </div>
          <AgentPanel />
        </div>
      </motion.section>

      <motion.section
        id="browser"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <BrowserPanel />
          <div className="md:order-2">
            <SectionHeading
              eyebrow="04 · Browser"
              title="The web, inside the workspace."
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Browse, search, and keep source-linked evidence attached to the
              work that depends on it.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="open-source"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex min-h-72 flex-col rounded-2xl border border-border/70 bg-background/30 p-7 sm:p-9">
            <div className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-card">
              <GithubIcon size={18} />
            </div>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              05 · Open source
            </p>
            <h2 className="mt-3 font-heading text-4xl font-medium leading-[0.96] tracking-[-0.05em]">
              Built in the open.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Inspect it. Shape it. Run it your way.
            </p>
            <Button
              className="mt-auto w-fit"
              variant="outline"
              render={
                <a
                  href="https://github.com/monolabsdev/poly-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
            >
              View repository
              <ArrowUpRight data-icon="inline-end" size={14} />
            </Button>
          </div>

          <div
            id="downloads"
            className="flex min-h-72 flex-col rounded-2xl border border-border/70 bg-card p-7 sm:p-9"
          >
            <div className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-background/50 text-muted-foreground">
              <Bot size={18} />
            </div>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              06 · Poly UI for desktop
            </p>
            <h2 className="mt-3 max-w-md font-heading text-4xl font-medium leading-[0.96] tracking-[-0.05em]">
              Make one interface your AI home.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Desktop downloads are coming soon.
            </p>
            <Button className="mt-auto w-fit" disabled>
              Download soon
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-heading text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">
        {title}
      </h2>
    </div>
  );
}

function AgentPanel() {
  const steps = [
    ["Research", "Complete"],
    ["Compare", "Complete"],
    ["Draft brief", "Working"],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/40">
      <div className="flex h-11 items-center justify-between border-b border-border/70 px-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Bot size={14} /> Agent run
        </div>
        <span className="rounded-full border border-border/70 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          In progress
        </span>
      </div>
      <div className="grid min-h-72 md:grid-cols-[9rem_1fr]">
        <div className="hidden border-r border-border/70 p-4 md:block">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Task
          </p>
          <p className="mt-3 text-xs leading-relaxed">Compare model pricing and prepare a recommendation.</p>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-sm font-medium">Preparing your brief</p>
          <p className="mt-1 text-xs text-muted-foreground">3 steps · 2 complete</p>
          <div className="mt-7 space-y-3">
            {steps.map(([label, status], index) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3">
                <span className="flex size-6 items-center justify-center rounded-lg border border-border/70 text-muted-foreground">
                  {status === "Complete" ? <Check size={12} /> : <span className="size-1.5 rounded-full bg-foreground" />}
                </span>
                <span className="text-xs">{label}</span>
                <span className="ml-auto font-mono text-[9px] text-muted-foreground">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/40 md:order-1">
      <div className="flex h-11 items-center gap-3 border-b border-border/70 px-4">
        <div className="flex gap-1.5"><span className="size-1.5 rounded-full bg-muted-foreground/40" /><span className="size-1.5 rounded-full bg-muted-foreground/25" /><span className="size-1.5 rounded-full bg-muted-foreground/20" /></div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 text-[10px] text-muted-foreground">
          <Globe2 size={11} />
          <span className="truncate">docs.polyui.dev/providers</span>
        </div>
      </div>
      <div className="grid min-h-68 md:grid-cols-[8rem_1fr]">
        <div className="hidden border-r border-border/70 p-4 md:block">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Sources</p>
          <div className="mt-4 space-y-2"><div className="h-2 w-full rounded bg-muted-foreground/20" /><div className="h-2 w-3/4 rounded bg-muted-foreground/10" /><div className="h-2 w-5/6 rounded bg-muted-foreground/10" /></div>
        </div>
        <div className="p-6 sm:p-7">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Provider guide</p>
          <h3 className="mt-4 font-heading text-2xl font-medium tracking-[-0.04em]">Connect once. Compare freely.</h3>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">Poly keeps source pages beside the conversation, so answers stay grounded and easy to revisit.</p>
          <div className="mt-7 flex items-center gap-2 text-[10px] text-muted-foreground"><span className="rounded-md border border-border/70 px-2 py-1">Source 01</span><span className="rounded-md border border-border/70 px-2 py-1">Source 02</span></div>
        </div>
      </div>
    </div>
  );
}
