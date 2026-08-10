import { ArrowUpRight, FileText, Search } from "lucide-react";
import { motion } from "motion/react";
import { DownloadRelease } from "@/components/DownloadRelease";
import { GithubIcon } from "@/components/GithubIcon";
import { Button } from "@/components/ui/button";

const providers = [
  { name: "OpenAI", logo: "/openai-blossom.svg" },
  { name: "Anthropic", logo: "/anthropic.svg" },
  {
    name: "Google Gemini",
    logo: "/google-gemini.svg",
  },
  { name: "Ollama", logo: "/ollama.svg" },
];

const reveal = {
  initial: { opacity: 0, y: 28, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export function ProductNarrativeSections() {
  return (
    <div className="pb-24 sm:pb-36">
      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6 sm:pt-36"
      >
        <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-20">
          <div>
            <h2 className="max-w-xl font-heading text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Everything you need. Nothing in the way.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Conversations, files, and instructions stay connected from first
              question to final artifact.
            </p>
          </div>

          <div className="self-end border-t border-border/70">
            <FeatureRow
              icon={FileText}
              title="Work directly with files."
              copy="Bring documents into the conversation without breaking focus."
            />
            <FeatureRow
              icon={Search}
              title="Search with evidence attached."
              copy="Use fresh web context and keep sources close to the answer."
            />
          </div>
        </div>

        <div
          id="providers"
          className="mt-14 scroll-mt-20 border-t border-border/70 pt-7 sm:mt-20 sm:flex sm:items-center sm:justify-between sm:gap-12"
        >
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Use the right local or cloud model without leaving the workspace.
          </p>
          <div className="mt-7 grid grid-cols-4 gap-3 sm:mt-0 sm:flex sm:items-center sm:gap-9">
            {providers.map(({ name, logo }) => (
              <div key={name} className="flex min-h-12 items-center justify-center">
                <img
                  src={logo}
                  alt={name}
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                  className="size-6 opacity-55 grayscale transition-opacity duration-300 hover:opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="agents"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6 sm:pt-36"
      >
        <div
          id="browser"
          className="grid scroll-mt-20 gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-20"
        >
          <h2 className="max-w-3xl font-heading text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            Delegate the work. Stay in control.
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            Plan, browse, and edit in one traceable workspace. Files and
            source-linked evidence stay attached to the work.
          </p>
        </div>

        <motion.figure
          className="mt-12 overflow-hidden rounded-2xl border border-border/70 bg-background/40 sm:mt-16"
          {...reveal}
        >
          <img
            src="/polyui-demo.png"
            alt="Poly UI desktop app with chat and browser panels"
            width={1733}
            height={1122}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </motion.figure>
      </section>

      <section
        id="open-source"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 sm:px-6 sm:pt-36"
      >
        <div className="border-y border-border/70 py-10 sm:py-14">
          <div className="grid items-end gap-12 md:grid-cols-[1fr_auto]">
            <div>
              <GithubIcon size={20} />
              <h2 className="mt-10 max-w-3xl font-heading text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                Built in the open.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                Source code, issues, and releases live on GitHub.
              </p>
            </div>
            <Button
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
            className="mt-12 scroll-mt-20 border-t border-border/50 pt-10"
          >
            <DownloadRelease />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  copy,
}: {
  icon: typeof FileText;
  title: string;
  copy: string;
}) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border/70 py-7">
      <Icon size={17} className="mt-1 text-muted-foreground" />
      <div>
        <h3 className="font-heading text-xl font-medium tracking-[-0.035em]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {copy}
        </p>
      </div>
    </div>
  );
}
