"use client";

import { Message } from "@/src/components/Message";
import { ChevronLeft, MoreVertical, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// const TabMessages = [
//   {
//     contenu: "Bonjour Jean \n La voiture est-elle toujours disponible ?",
//     date: "14:18",
//     role: "buyer",
//   },
//   {
//     contenu:
//       "Bonjour, \n Elle est toujours disponible. \n Voulez-vous venir la voir pour un essai ?",
//     date: "14:22",
//     role: "seller",
//   },
//   {
//     contenu: "Oui, samedi a 14h, cela me convient parfaitement !",
//     date: "14:25",
//     role: "buyer",
//   },
//   {
//     contenu: "Ok, a samedi!",
//     date: "14:26",
//     role: "seller",
//   },
// ];

const TabMessages = [
  {
    contenu: "",
    date: "",
    role: "buyer",
  },
];

export default function Chat_session() {
  // ! States / Etats
  const [show, setShow] = useState(false);

  // ! Comportements / Fonctions
  // ! Rendue / Affichage
  return (
    <>
      <header className="flex justify-between px-4 py-2 border-b border-gray-500 bg-white text-black w-full md:w-3/4">
        <div className="flex items-center gap-1 justify-center">
          <Link
            href="/Dashboard/Chat"
            className="p-2 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white"
          >
            <ChevronLeft size={30} />
          </Link>
          <div className="flex items-center justify-center">
            <span className="relative p-2 border-2 border-green-600 rounded-full size-15">
              <Image
                src="/avatars/man_1.jpg"
                alt="avatars/man_1.jpg"
                fill
                sizes="(max-width: 640px) 20vw"
                className="object-cover rounded-full"
              />
              <span className="absolute bottom-1 z-10 right-0 size-2 bg-green-600 rounded-full"></span>
            </span>
            <span className="p-2 flex flex-col items-start justify-center gap-0">
              <h1 className="font-bold">Jean Dupont</h1>
              <h1 className="font-bold text-xl">BMW Serie 3 2020</h1>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          <button
            onClick={() => setShow(!show)}
            className="flex items-center justify-center hover:bg-emerald-600 hover:text-white rounded-full transition-colors duration-300 py-1 px-1"
          >
            {" "}
            <MoreVertical />
          </button>
          {show && (
            <span className="flex flex-col justify-center gap-2 p-3 rounded-md bg-gray-100 absolute top-full right-0 z-10 w-50">
              <Link
                href="/v1/Details"
                className="hover:bg-gray-300 rounded-md transition-colors duration-300 text-center py-1.5 px-2"
              >
                Voir l&lsquo;annonce
              </Link>
              <button className="hover:bg-white hover:text-red-500 hover:border-white bg-red-500 text-white border-t border-red-500 transition-colors duration-300 rounded-md">
                Clear Chat
              </button>
            </span>
          )}
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center md:w-3/4 border-x h-full border-gray-400 bg-[url('/pattern.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
        {/* Message Container */}
        <div className="flex-1 flex flex-col gap-1 py-2 px-4 justify-end md:mx-10 w-full h-full max-h-full overflow-y-auto scroll-m-0 backdrop-blur-xs">
          {TabMessages.map((msg, index) => (
            <Message message={msg} key={index} />
          ))}
        </div>
        {/* Message Container */}
      </main>
      {/* Action Container */}
      <div className="bg-white w-full py-2 px-4 md:px-30 flex flex-col items-center justify-center gap-1 md:w-3/4">
        <form className="w-full flex items-center border-b-2 border-gray-300">
          <input
            type="text"
            className="flex-1 p-2 rounded-l-md outline-none border border-emerald-800"
            placeholder="Ecrivez votre message..."
          />
          <button className="p-2 bg-emerald-800 border border-emerald-800 text-white flex items-center justify-center rounded-r-md">
            <Send />
          </button>
        </form>
        <Link
          href="/Dashboard"
          className="px-3 py-1.5 rounded-md bg-emerald-800 text-white"
        >
          Retour a l&apos;accueil
        </Link>
      </div>
      {/* Action Container */}
    </>
  );
}
