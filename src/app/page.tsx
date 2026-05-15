"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter()

  route.push("/v1/Accueil")
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline">
      CARYA HOME-PAGE
    </h1>
    <p className="mb-4">Vous allez être redirigé vers la page d&apos;accueil.</p>
      <h1 className="text-3xl font-bold">Redirection en cours...</h1>
    </div>
  );
}
