import { Plus } from "lucide-react";
import React, { Suspense } from "react";
import Loading from "@/src/components/load/loading";
import AnnounceSection from "./AnnouncePage";

export default function AnnouncementPage() {
  return (
    <section className="flex flex-col p-4 min-h-screen">
      <header className="flex flex-col border-b border-gray-300 md:px-30">
        <h1 className="font-bold text-3xl py-2">Mes Annonces</h1>
        <p className="text-gray-500 pb-1">Gerez vos annonces de vehicules.</p>
      </header>
      <main className="flex-1 py-2 w-full">
        <Suspense fallback={<Loading />}>
          <AnnounceSection />
        </Suspense>
      </main>
      <footer className="w-full flex items-center justify-center py-4">
        <button className="text-white text-center font-bold py-2 px-10 rounded-md bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center">
          <Plus /> Ajouter une Annonce
        </button>
      </footer>
    </section>
  );
}
