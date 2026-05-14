import { Dot, Eye, Pen, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Car = {
  id: string;
  src_image: string;
  name: string;
  price: number;
  status: string;
  views: number;
  msg: number;
};

export const CardAnnouncement = ({
  src_image,
  name,
  price,
  status,
  views,
  msg,
  id,
}: Car) => {
  if(!src_image || !name ) return null;
  return (
    <div className="flex flex-col md:flex-row shadow-md shadow-gray-400 rounded-md w-full bg-white">
      {/* Details */}
      <div className="flex gap-3 py-0.5 md:p-2 w-full">
        <span className="relative max-h-full h-30 w-40 md:w-60">
          <Image
            src={src_image}
            alt={src_image}
            fill
            sizes="(max-width: 640px) 60vw"
            className="object-cover rounded-tl-md md:rounded-none"
          />
          <h1
            className={`${status === "Vendue" ? "flex" : "hidden"} absolute z-10 top-1/7 left-0 right-0 py-0.5 px-2 w-30 text-xl bg-orange-400 text-white -rotate-12 justify-center`}
          >
            VENDUE
          </h1>
        </span>
        <div className="flex flex-col gap-1 w-full">
          <span className="w-full flex justify-between items-start pr-5 pt-1">
            <h1 className="font-bold text-[18px] md:text-2xl uppercase">
              {name?.toLocaleUpperCase()}
            </h1>
            <h1 className="text-xl md:text-2xl font-black">
              {price.toLocaleString()} <b className="text-base">Fcfa</b>
            </h1>
          </span>
          <span className="w-full flex items-start justify-start">
            <h1
              className={`rounded-md ${status === "En Ligne" ? "bg-emerald-800 text-white" : status === "Vendue" ? "bg-red-600 text-white" : "bg-yellow-500 text-black"} font-bold py-1 px-2 text-center`}
            >
              {status}
            </h1>
          </span>
          <span className="flex items-start w-full">
            <h1 className="flex items-center text-center gap-2">
              <b
                className={`size-2 ${status === "En Ligne" ? "bg-green-600" : "bg-red-600"} bg-green-600 rounded-full`}
              ></b>{" "}
              {views} Vues
            </h1>{" "}
            <Dot />
            <h1 className="flex items-center text-center gap-2">
              <b
                className={`size-2 ${status === "En Ligne" ? "bg-green-600" : status === "En Attente" ? "bg-yellow-400" : "bg-red-600"} bg-green-600 rounded-full`}
              ></b>{" "}
              {msg} Messages
            </h1>
          </span>
        </div>
      </div>
      {/* Actions */}
      <div
        className={`py-2 px-1 flex items-center gap-3 ${status === "Vendue" ? "md:justify-start justify-center" : "justify-start"} border-t border-gray-300 w-full md:w-1/3 min-w-2/5`}
      >
        {status === "Vendue" ? (
          <button className="shadow shadow-gray-300 border border-gray-300 py-1 px-4 text-center bg-gray-50 hover:bg-gray-100 text-black rounded-md flex items-center justify-center gap-2">
            <Eye /> Voir Details
          </button>
        ) : (
          <>
            <Link
              href={`/Dashboard/Announcements/${id}`}
              className="shadow shadow-gray-300 border border-gray-300 py-1 px-3 text-center bg-gray-50 hover:bg-gray-100 text-black rounded-md flex items-center justify-center gap-2"
            >
              <Pen /> Edit
            </Link>
            <button className="shadow shadow-gray-300 border border-gray-300 py-1 px-3 text-center bg-gray-50 hover:bg-gray-100 text-red-600 hover:text-red-500 rounded-md flex items-center justify-center gap-2">
              <Trash2 /> Supprimer
            </button>
            {status !== "En Attente" && (
              <button className="shadow shadow-gray-300 border border-gray-300 py-1 px-3 text-center bg-gray-50 hover:bg-gray-100 text-black rounded-md flex items-center justify-center gap-2">
                <Star /> Mettre en Avant
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
