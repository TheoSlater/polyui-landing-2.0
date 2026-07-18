import { HeroWireframe } from "@/components/HeroWireframe";
import { ProductNarrativeSections } from "@/components/ProductNarrativeSections";
import { SiteHeader } from "@/components/SiteHeader";

function App() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <HeroWireframe />
        <ProductNarrativeSections />
      </main>
    </div>
  );
}

export default App;
