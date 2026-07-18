import { HeroWireframe } from "@/components/HeroWireframe";
import { ProductNarrativeSections } from "@/components/ProductNarrativeSections";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

function App() {
  return (
    <div className="min-h-dvh">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroWireframe />
        <ProductNarrativeSections />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
