import Image from "next/image";
import Link from "next/link";

interface Cars {
  _id: string;
  photos: {
    image_url: string;
  }[];
  status: string;
  transmission: string;
  brand: string;
  model: string;
  year: string;
  price: number;
  mileage: string;
  fuel: string;
}

export function CarCard({ car }: { car: Cars }) {
  if(!car?.photos?.[0]?.image_url || !car?.brand || !car?.model) return null; // ? Si la voiture n'est pas définie, on ne rend rien
  return (
    <div className="rounded-md flex flex-row lg:flex-col items-center justify-center h-40 lg:h-90 w-full shadow-xs shadow-gray-700 overflow-hidden bg-white">
      <span className="relative w-5/6 md:w-4/5 lg:w-full h-full">
        {/* Image de la voiture */}
       {car ? <Image
          src={car?.photos[0]?.image_url}
          alt={car?.photos[0]?.image_url}
          fill
          sizes="(max-widht:640px) 30vw"
          className="object-cover"
        />: (<p>Invalid URL</p>)}
      </span>
      <span className="px-3 flex flex-col relative lg:h-2/5 w-full">
        {/* Description et Action */}
        <span className="w-full pt-2 pb-1 border-b border-gray-700">
          <h1 className="font-bold text-base">
            {car?.brand?.toLocaleUpperCase()} {car?.model?.toLocaleUpperCase()}
          </h1>
          <h1 className="font-bold text-xl">{car?.price?.toLocaleString()} Fcfa</h1>
        </span>
        <span className="w-full pt-2 pb-1 flex flex-col lg:flex-row lg:justify-between items-start justify-start">
          <p className="text-[13px] max-w-5/6 pr-2 line-clamp-1">
            {car?.mileage} km . {car?.fuel} . {car?.transmission}
          </p>
          <p
            className={`rounded-md py-1 px-2 text-white ${car?.status === "Disponible" ? "bg-emerald-800" : car?.status === "Reservee" ? "bg-amber-500" : car?.status === "Promotion" ? "bg-red-800" : "bg-blue-400" } lg:absolute right-3 top-3 text-center  text-[13px]`}
          >
            {car?.status || "Nouveau"}
          </p>
        </span>
        <span className="w-full lg:-mt-6 lg:mb-2 flex items-end justify-end-safe">
          <Link
            href={`/v1/Details?id=${car?._id}`}
            className="hover:bg-emerald-700 rounded-md px-4 py-1 text-center text-white bg-emerald-800"
          >
            Voir Details
          </Link>
        </span>
      </span>
    </div>
  );
}
