"use client";

import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  src_image: string;
  nom_vendeur: string;
  nom_voiture: string;
  message: string;
  horodatage: string;
  non_lue?: number
  url: string
}
export function Item({
  src_image,
  nom_vendeur,
  nom_voiture,
  message,
  horodatage: time,
  non_lue,
  url
}: ItemProps) {
  return (
    <Link href={url} className="hover:bg-emerald-800 hover:text-white group transition-all duration-300 px-3 flex items-start justify-between mx-3 my-2 py-1 border-b border-gray-300 h-25 rounded-md">
      <span className="rounded-full size-18 relative">
        <Image
          src={`/avatars/${src_image}`}
          alt={src_image}
          fill
          sizes="(max-width: 640px) 20vw"
          className="object-cover rounded-full"
        />
      </span>
      <span className="px-2 text-start flex-1">
        <span className="flex flex-col items-start pt-0.5">
          <h1 className="text-xl font-bold">{nom_vendeur}</h1>
          <h1 className="text-xl font-bold py-0.5">{nom_voiture}</h1>
        </span>
        <p className="line-clamp-1">
          {message}
        </p>
      </span>
      <span className="flex flex-col items-end justify-start gap-4 w-auto h-full">
        <h1 className="text-gray-400 group-hover:text-white">{time}</h1>
        <button className={`rounded-full p-1 text-white bg-blue-800 size-7 items-center justify-center group-hover:bg-white group-hover:text-blue-800 ${non_lue ? "flex": "hidden"}`}>
          {non_lue}
        </button>
      </span>
    </Link>
  );
}
