"use client";
import { WhatsApp } from "@mui/icons-material";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState} from "react";
import { getUserById } from "../lib/getUserById";


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
  ownerId: string
}

export default function Card({ car }: {car: Cars}) {
  const [phone, setPhone] = useState<number>(237000000000);
  
  if (!car?.photos?.[0]?.image_url) return null; // ? Si l'URL de l'image n'est pas valide, on ne rend pas le composant
    const fetchUser = async () => {
      const userData = await getUserById(car?.ownerId?.toString() || "");
      setPhone(userData?.user?.phone as number);
      console.log("User Data:", userData ? userData?.user?.phone : "No user data found", phone);
    }

  // ? Redirection vers WhatsApp
  const handleClick = () => {
    fetchUser();
    const url = `https://wa.me/237${phone}`;
    window.open(url, "_blank"); // ? ouverture de WhatsApp dans un nouvel onglet
  };

  console.log("Car in Card Component (Accueil):", car);
  return (
    <div className="flex w-fit h-50 p-1 gap-1 bg-white rounded-md shadow-md shadow-gray-100">
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
        <button onClick={handleClick} className="rounded-b-md w-full h-11 px-1 gap-2 sm:gap-0 lg:px-2 py-1 flex items-center justify-center font-bold hover:bg-white hover:text-emerald-500 bg-emerald-500 text-white transition-colors duration-300">
          <WhatsApp /> <b className="hidden sm:flex no-wrap lg:mx-1">Contacter sur {" "}</b> WhatsApp
        </button>
      </div>
      <div className="flex flex-col justify-between w-1/2 h-full p-1 lg:p-2 pb-1 shadow-md shadow-white/70">
        <span className="flex flex-col py-5 px-3 mb-2 h-full w-55 lg:w-60 border-b border-b-gray-500">
          <h1 className="font-bold text-2xl line-clamp-1">
            {car?.brand?.toLocaleUpperCase()} {car?.model?.toLocaleUpperCase()}
          </h1>
          <h1 className="font-bold text-2xl m-2">{car?.price?.toLocaleString()} Fcfa</h1>
          <p className="text-base">
            {car?.mileage} . {car?.fuel}
          </p>
        </span>
        <Link
          href={`/v1/Chat/${car._id}`}
          className="flex items-center gap-2 sm:gap-0 justify-center font-bold p-1 w-full rounded-md hover:text-white hover:bg-emerald-500 text-emerald-500 transition-all duration-300 hover:shadow-md shadow-gray-400"
        >
          <MessageCircle /> <b className="hidden sm:flex no-wrap mx-1">Envoyer un {" "}</b> Message
        </Link>
      </div>
    </div>
  );
}
