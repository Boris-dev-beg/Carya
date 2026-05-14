import Image from "next/image";

type Car = {
  brand: string;
  year: string;
  model: string;
  photos: {
    image_url: string;
  }[];
  mileage: string;
  transmission: string;
  fuel: string;
  status?: string;
  date?: string;
};

export function Car({ car }: { car: Car }) {
  if(!car) return null;
  return (
    <div className="flex items-center justify-center shadow-md shadow-gray-300 w-full md:h-40">
      <span className="relative w-1/3 h-full rounded-l-md">
        <Image
          src={car?.photos[0]?.image_url}
          alt={car?.photos[0]?.image_url}
          fill
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 60vw"
          className="object-cover rounded-l-md"
        />
      </span>
      <span className="w-2/3 py-2 px-2 rounded-r-md bg-emerald-50 h-full">
        <span className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {car?.brand} {car?.model} {car?.year}
          </h1>
          <button
            className={`${car?.status === "En Ligne" ? "bg-emerald-800" : car?.status === "En Attente" ? "bg-yellow-600" : car?.status === "Vendue" ? "bg-red-800" : "bg-blue-400"} text-white py-1 px-3 text-center rounded-md`}
          >
            {car?.status || "Disponible"}
          </button>
        </span>
        <p className="py-2 font-bold border-b border-gray-500">
          {car?.mileage} Km . {car?.fuel} . {car?.transmission}
        </p>
        <span className="flex justify-between items-center pt-2">
          <p
            className={`${car?.status != "Vendue" ? "flex" : "hidden"} py-1 px-2 bg-emerald-700 rounded-xs text-white`}
          >
            15 Messages
          </p>
          <button className="bg-gray-50 hover:bg-gray-100 font-bold rounded-md py-1 px-3 text-center border-gray-600 border shadow ml-auto">
            {car?.status != "Vendue" ? "Gerer" : "Voir les details"}
          </button>
        </span>
      </span>
    </div>
  );
}
