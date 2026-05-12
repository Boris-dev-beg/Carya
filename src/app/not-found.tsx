import React from "react";
import Link from "next/link";
import { CarFront } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="text-emerald-600 text-9xl mb-8 animate-bounce -rotate-25">
        <CarFront className="size-15" />
      </div>
      <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-6">
        Oups ! On dirait que vous avez fait une sortie de route.
      </h2>
      <p className="text-gray-500 max-w-md mb-10">
        La page que vous recherchez a peut-etre ete depace ou n&apos;existe plus.
      </p>
      <div className="flex gap-4">
        <Link
          href="/v1/Accueil"
          className="bg-emerald-700 transition shadow-lg shadow-emerald-500/30 rounded-xl text-center text-white px-4 py-3"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/v1/Contact"
          className="bg-slate-100 text-slate-600 text-center px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition"
        >
          Contacter l&apos;assistance
        </Link>
      </div>
    </div>
  );
}
