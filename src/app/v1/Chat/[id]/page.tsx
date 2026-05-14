"use client";

import { Message } from "@/src/components/Message";
import { ChevronLeft, MoreVertical, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type User = {
  _id: string;
  name: string;
  role: string;
};
type Car = {
  brand: string;
  year: string;
  model: string;
  photos: {
    image_url: string;
  }[];
};

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
    role: "",
  },
];
// ! Recuperation des informations (Infos Voiture et Vendeur)
const getInfoSeller = async (id: string) => {
  try {
    const response = await fetch(`/api/getUser/${id}`);

    if (!response.ok) throw new Error("Can't find the seller of this car");

    const user = await response.json();
    return user?.user;
  } catch (err) {
    console.log("Error Finded:", err);
    return;
  }
};
const getInfoCar = async (id: string) => {
  try {
    const response = await fetch(`/api/cars/${id}`);

    if (!response.ok) throw new Error("Can't find the spefied car");

    const car = await response.json();

    return car;
  } catch (err) {
    console.log("Error while getting Car Info", err);
    return;
  }
};

export default function Chat_session() {
  // ! States / Etats
  const params = useParams();
  const id = params.id as string;
  const [show, setShow] = useState(false);
  const refShow = useRef<HTMLDivElement | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messagesHistory, setMessagesHistory] = useState(
    TabMessages || [{ contenu: "", role: "", date: "" }],
  ); // ? A revoir pour le format du message (ex: sauter une ligne) et pour le role (buyer ou seller) en fonction de l'utilisateur connecté et du vendeur de la voiture
  const [car, setCar] = useState<Car>();
  const [seller, setSeller] = useState<User>();
  const [loading, setLoading] = useState(true); // ? A revoir pour le loading (ex: afficher un spinner pendant le chargement des infos de la voiture et du vendeur)

  // ! Comportements / Fonctions
  const SendMessage = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (currentMessage.trim() === "") return; // ? Eviter d'envoyer des messages vides ou composés uniquement d'espaces

    const hours = new Date().getHours();
    const min = new Date().getMinutes();

    setMessagesHistory((prev) => [
      ...prev,
      {
        contenu: currentMessage, // ? A revoir pour le format du message (ex: sauter une ligne)
        date: hours + " : " + min, // ? A revoir pour le format de l'heure
        role: "buyer", // ? A revoir pour le role (buyer ou seller) en fonction de l'utilisateur connecté et du vendeur de la voiture
      },
    ]);
    TabMessages.push(...messagesHistory);
    setCurrentMessage("");
  };

  useEffect(() => {
    const hideShow = (event: MouseEvent) => {
      // ? Si la ref du show existe et que le click est hors du show alors on met show a false
      const target = event.target as Node;
      if (refShow.current && !refShow.current.contains(target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", hideShow);

    return () => document.removeEventListener("mousedown", hideShow);
  }, [refShow]);

  useEffect(() => {
    const fetchInfos = async () => {
      setLoading(true); // ? On met le loading a true avant de commencer a fetch les infos de la voiture et du vendeur
      const car = await getInfoCar(id); // ? On recupere les infos de la voiture grace a son id (ex: marque, model, année, photos, etc...)
      if (car) {
        const ownerId = car?.ownerId as string;
        const user = await getInfoSeller(ownerId);

        setCar(car);
        setSeller(user);
      }
      setLoading(false); // ? On met le loading a false une fois que les infos de la voiture et du vendeur sont recuperees et stockees dans les states respectifs
    };
    fetchInfos();
  }, [id]);

  // ! Rendue / Affichage
  return (
    <>
      <header className="flex justify-between px-4 py-2 border-b border-gray-500 bg-white rounded-t-md text-black md:w-3/4 w-full">
        <div className="flex items-center gap-1 justify-center">
          <Link
            href="/v1/Chat"
            className="p-2 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white"
          >
            <ChevronLeft size={30} />
          </Link>
          <div className="flex items-center justify-center">
            <span className="relative p-2 border-2 border-green-600 rounded-full size-15">
              {loading ? (
                <div className="bg-gray-300 border-2 border-green-600 rounded-full size-15 flex items-center justify-center">
                  <span className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></span>
                </div>
              ) : (
                <Image
                  src={car?.photos[0]?.image_url}
                  alt={car?.photos[0]?.image_url}
                  fill
                  sizes="(max-width: 640px) 20vw"
                  className="object-cover rounded-full"
                />
              )}
              <span className="absolute bottom-1 z-10 right-0 size-2 bg-green-600 rounded-full"></span>
            </span>
            <span className="p-2 flex flex-col items-start justify-center gap-0">
              <h1 className="font-bold"> {loading ? "Chargement..." : seller?.name}</h1>
              <h1 className="font-bold text-xl">
                {loading ? "Chargement..." : `${car?.brand} ${car?.model} ${car?.year}`}
              </h1>
            </span>
          </div>
        </div>
        <div
          ref={refShow}
          className="flex items-center justify-center relative"
        >
          <button
            onClick={() => setShow(!show)}
            className="flex items-center justify-center hover:bg-emerald-600 hover:text-white rounded-full transition-colors duration-300 py-1 px-1"
          >
            {" "}
            <MoreVertical />
          </button>
          {show && (
            <span className="flex flex-col justify-center gap-2 p-3 rounded-md bg-slate-200 absolute top-full right-0 md:right-1/2 center z-10 w-50">
              <Link
                href="/profile?"
                className="hover:bg-gray-300 rounded-md transition-colors duration-300 text-center py-1.5 px-2"
              >
                Info sur le vendeur
              </Link>
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
      <main className="flex-1 flex flex-col justify-center items-center md:w-3/4 border-x border-gray-400 bg-[url('/pattern.jpg')] bg-cover bg-center bg-no-repeat bg-fixed max-h-[80vh]">
        {/* Message Container */}
        <div className="flex-1 flex flex-col gap-1 py-2 px-4 md:mx-10 w-full h-[70vh] max-h-full overflow-y-auto scroll-m-0 backdrop-blur-xs">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : (
            messagesHistory.map((msg, index) => (
              <Message message={msg} key={index} />
            ))
          )}
        </div>
        {/* Message Container */}
      </main>
      {/* Action Container */}
      <div className="bg-white w-full py-2 px-4 md:px-30 flex flex-col items-center justify-center gap-1 md:w-3/4 rounded-b-md border-b-2 border-gray-300">
        <form
          onSubmit={SendMessage}
          className="w-4/5 overflow-hidden pl-4 py-2 pr-2 flex items-center rounded-full border border-emerald-950"
        >
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="flex-1 p-2 rounded-l-md outline-none"
            placeholder="Ecrivez votre message..."
          />
          <button
            type="submit"
            className="p-2 text-emerald-800 flex items-center justify-center rounded-r-md"
          >
            <Send />
          </button>
        </form>
      </div>
      {/* Action Container */}
    </>
  );
}
