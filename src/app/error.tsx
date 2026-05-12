"use client";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="text-center text-red-700 flex flex-col items-center justify-center">
        <AlertTriangle className="h-10 w-10 mr-2" />
        <h1 className="text-4xl font-bold">
          Une erreur est survenue
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          {error.message || "Erreur Inconnue"}
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 flex items-center justify-center gap-2"
        >
          <RefreshCcw className="mr-2 h-5 w-5" />
          Try Again
        </button>
      </div>
    </div>
  );
}
