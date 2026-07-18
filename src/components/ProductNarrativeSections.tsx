import { ArrowUpRight, FileText, Search, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { DownloadRelease } from "@/components/DownloadRelease";
import { GithubIcon } from "@/components/GithubIcon";
import { Button } from "@/components/ui/button";

const providers = [
  { name: "OpenAI", logo: "/openai-blossom.svg" },
  { name: "Anthropic", logo: "https://cdn.simpleicons.org/anthropic/ffffff" },
  {
    name: "Google Gemini",
    logo: "https://cdn.simpleicons.org/googlegemini/ffffff",
  },
  { name: "Ollama", logo: "https://cdn.simpleicons.org/ollama/ffffff" },
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
        <p className="text-sm text-muted-foreground">Models</p>
        <h2 className="mt-5 max-w-3xl font-heading text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">
          Use the right model for the moment.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Bring cloud and local models into one conversation. Switch
          intelligence without switching your workspace.
        </p>

        <div className="mt-14 grid grid-cols-2 border-y border-border/70 sm:grid-cols-4">
          {providers.map(({ name, logo }, index) => (
            <div
              key={name}
              className={`flex min-h-24 items-center justify-center px-6 py-7 ${
                index % 2 === 0 ? "border-r border-border/70" : ""
              } ${index === 1 ? "sm:border-r sm:border-border/70" : ""} ${
                index < 2 ? "max-sm:border-b max-sm:border-border/70" : ""
              }`}
            >
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
      </motion.section>

      <motion.section
        id="features"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <div className="grid gap-16 md:grid-cols-[1.15fr_0.85fr] md:gap-24">
          <div className="border-t border-border/70 pt-7">
            <Sparkles size={18} className="text-muted-foreground" />
            <h2 className="mt-12 max-w-xl font-heading text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">
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
      </motion.section>

      <motion.section
        id="agents"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <h2 className="max-w-3xl font-heading text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">
          Delegate the work. Stay in control.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Poly plans, researches, edits, and reports back in one traceable
          workspace. Every step stays visible.
        </p>

        <figure className="mt-14 overflow-hidden rounded-2xl border border-border/70 bg-background/40 sm:mt-20">
          <img
            src="/polyui-demo.png"
            alt="Poly UI desktop app with chat and browser panels"
            width={1733}
            height={1122}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </figure>
      </motion.section>

      <motion.section
        id="browser"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <div className="border-l border-border/70 pl-7 sm:pl-12">
          <h2 className="font-heading text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">
            The web, inside the workspace.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Browse, search, and keep source-linked evidence attached to the work
            that depends on it.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="open-source"
        className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48"
        {...reveal}
      >
        <div className="border-y border-border/70 py-10 sm:py-14">
          <div className="grid items-end gap-12 md:grid-cols-[1fr_auto]">
            <div>
              <GithubIcon size={20} />
              <h2 className="mt-10 max-w-3xl font-heading text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">
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
      </motion.section>
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
