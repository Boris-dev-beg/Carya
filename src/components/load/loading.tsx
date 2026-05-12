export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        {/* Texte */}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Chargement en cours...
        </p>
      </div>
    </div>
  );
}
