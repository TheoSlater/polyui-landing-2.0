import { Download } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { BlurIn } from "@/components/BlurIn";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";
import { PolyDemoWindow } from "@/components/demo/PolyDemoWindow";

const GLOW_COLORS = ["#d15577", "#a13352", "#6b2242", "#41184f"];

export function HeroWireframe() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.25rem)] items-center">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <BlurIn>
            <h1 className="text-left font-heading text-5xl font-medium leading-[0.92] tracking-[-0.055em] pb-1 sm:text-6xl xl:text-7xl">
              <span className="block">One interface for</span>
              <span className="block"><em className="italic">every</em> AI model.</span>
            </h1>
          </BlurIn>
          <BlurIn className="flex flex-col gap-6 lg:items-end lg:text-right">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Run local and cloud models, search the web, work with files, and
              use agents from one focused desktop workspace.
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Button size="lg" render={<a href="#downloads" />} nativeButton={false}>
                <Download data-icon="inline-start" size={15} />
                Download Poly UI
              </Button>
              <Button variant="outline" size="lg" render={<a href="https://github.com/monolabsdev/poly-ui" target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
                <span data-icon="inline-start"><GithubIcon size={15} /></span>
                View on GitHub
              </Button>
            </div>
          </BlurIn>
        </div>

        {/* Oversized demo with a restrained ambient glow */}
        <div className="relative mt-14 sm:mt-20">
          <GlowEffect
            colors={GLOW_COLORS}
            mode="breathe"
            blur="none"
            duration={10}
            scale={1.18}
            className="rounded-3xl opacity-50 blur-[70px]"
          />
          <div className="relative">
            <PolyDemoWindow />
          </div>
        </div>
      </div>
    </section>
  );
}
