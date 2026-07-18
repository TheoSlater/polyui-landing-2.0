import { HeroWireframe } from "@/components/HeroWireframe";
import { ProductNarrativeSections } from "@/components/ProductNarrativeSections";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

function App() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <HeroWireframe />
        <ProductNarrativeSections />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
