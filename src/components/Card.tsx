import { WhatsApp } from "@mui/icons-material";
import { MessageCircle } from "lucide-react";
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
export default function Card({ car }: {car: Cars}) {
  if (!car) return
  console.log("Car: ...", car);
  return (
    <div className="flex w-120 lg:w-130 h-50 p-1 gap-1 bg-white rounded-md shadow-md shadow-gray-100">
      <div className="flex flex-col items-center w-1/2 h-full">
        <div className="w-full h-full relative">
          {car ? (
            <Image
              src={car?.photos[0].image_url || "/hero-banner.png"}
              alt={`/car_Image/${car?.photos[0].image_url}` || "/hero-banner.png"}
              fill={true}
              className="rounded-t-md"
            />
          ) : (
            <p>Invalid URL</p>
          )}
        </div>
        <button className="rounded-b-md w-full h-11 px-2 py-1 flex items-center gap-2 font-bold hover:bg-white hover:text-emerald-500 bg-emerald-500 text-white transition-colors duration-300">
          <WhatsApp /> Contacter sur WhatsApp
        </button>
      </div>
      <div className="flex flex-col justify-between w-1/2 h-full p-2 pb-1 shadow-md shadow-white/70">
        <span className="flex flex-col py-5 px-3 mb-2 h-full w-55 lg:w-60 border-b border-b-gray-500">
          <h1 className="font-bold text-2xl line-clamp-1">
            {car?.brand} {car?.model}
          </h1>
          <h1 className="font-bold text-2xl m-2">{car?.price?.toLocaleString()} Fcfa</h1>
          <p className="text-base">
            {car?.mileage} . {car?.fuel}
          </p>
        </span>
        <Link
          href={`/v1/Chat/${car._id}`}
          className="flex items-center justify-center gap-2 font-bold p-1 w-full rounded-md hover:text-white hover:bg-emerald-500 text-emerald-500 transition-all duration-300 hover:shadow-md shadow-gray-400"
        >
          <MessageCircle /> Envoyer un message
        </Link>
      </div>
    </div>
  );
}
