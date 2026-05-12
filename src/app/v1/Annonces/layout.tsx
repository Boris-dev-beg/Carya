import Loading from "@/src/components/load/loading";
import { Suspense } from "react";

export default function LayoutAnnonce({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-w-full flex flex-col w-full items-center justify-center">
      <header className="flex flex-col w-full lg:w-[92vw]">
        <div className="w-full  px-5 py-2.5 bg-white text-black shadow-xs shadow-white/30">
          <h1 className="font-bold text-3xl">Annonces de voitures</h1>
          <p>Trouvez votre prochaine voiture</p>
        </div>
        <div className="flex flex-col lg:flex-row w-full md:gap-2 md:px-5 p-2 bg-white/60 border-b border-white/30">
          <span className="w-full lg:w-3/4 flex gap-2 pb-2.5 pt-1">
            <select className="w-full p-2 rounded-md outline-none border border-gray-400 bg-white/90 text-black">
              <option value="">Marque</option>
              <option value="bmw">BMW</option>
              <option value="audi">Audi</option>
              <option value="vw">VW</option>
            </select>
            <select className="w-full p-2 rounded-md outline-none border border-gray-400 bg-white/90 text-black">
              <option value="">Model</option>
              <option value="serie">Serie</option>
              <option value="audi">Q5</option>
              <option value="golf">Golf</option>
            </select>
            <select className="w-full p-2 rounded-md outline-none border border-gray-400 bg-white/90 text-black">
              <option value="">Prix</option>
              <option value="10000"> &gt; 10 000 $</option>
              <option value="20000">&gt; 20 000 $</option>
              <option value="30000">&gt; 30 000 $</option>
            </select>
            <select className="w-full p-2 rounded-md outline-none border border-gray-400 bg-white/90 text-black">
              <option value="">Km</option>
              <option value="50">50 000 Km</option>
              <option value="70"> 70 000 km</option>
              <option value="90">90 000 km</option>
            </select>
          </span>
          <button className="bg-emerald-800 w-full md:w-1/4 text-white text-center py-2 rounded-md">
            Rechercher
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-[90vw] lg:w-[92vw]">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </section>
  );
}
