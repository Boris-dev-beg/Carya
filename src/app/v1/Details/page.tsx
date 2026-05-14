"use client";
import { ChevronLeft, ChevronRight, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ButtonContact } from "./ButtonContact";
import { useSearchParams } from "next/navigation";

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

type User = {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
};

// ? Recuperation des infos de la voiture a partir de son ID
const getCar = async (id: string) => {
  try {
    const res = await fetch(`/api/cars/${id}`); // ? Recuperation des infos de la voiture a partir de son ID

    if (!res.ok) throw new Error("Probleme de recuperation de la voiture !");

    const car = await res.json();

    console.log("Car Data:", car);
    return { car };
  } catch (err) {
    console.log("Error Finded:", err);
    return { car: null };
  }
};
// ? Recuperation des Infos du vendeur a partir de son ID
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

export default function Details() {
  // ! States // ! Hooks
  const params = useSearchParams(); // ? Permet de recuperer les parametres de l'URL
  const id = params.get("id"); // ? Recuperation de l'ID de la voiture a partir de l'URL
  const [car, setCar] = useState<Cars>(); // ? State pour stocker les infos de la voiture
  const [seller, setSeller] = useState<User>(); // ? State pour stocker les infos du vendeur
  const [loading, setLoading] = useState(true); // ? State pour stocker l'etat de chargement des infos de la voiture et du vendeur

  // ! Functions // ! UseEffects
  useEffect(() => {
    // ? Fonction pour recuperer les infos de la voiture et du vendeur a partir de l'ID de la voiture
    const fecthCar = async () => {
      const { car } = await getCar(id as string); // ? Recuperation des infos de la voiture a partir de son ID

      if (car !== null) {
        const ownerId = car?.ownerId as string;
        const user = await getInfoSeller(ownerId); // ? Recuperation des infos du vendeur a partir de son ID

        setCar(car); // ? On set la voiture dans le state pour pouvoir l'afficher dans le composant
        setSeller(user); // ? On set le vendeur dans le state pour pouvoir l'afficher dans le composant
      }
      setLoading(false); // ? On set l'etat de chargement a false une fois les infos recuperées
    };
    fecthCar(); // ? On appelle la fonction pour recuperer les infos de la voiture et du vendeur a partir de l'ID de la voiture
  }, [id]);
  console.log("Car:", car);
  console.log("Seller:", seller);

  // ! Render // ! JSX
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }
  return (
    <section className="flex flex-col max-w-screen w-[99vw]">
      <header className="px-5 py-3 text-start bg-white">
        <h1 className="font-bold text-3xl px-2 uppercase">
          {loading
            ? "Chargement..."
            : `${car?.brand} ${car?.model} ${car?.year}`}
        </h1>
        <p className="px-2 text-sm">
          {loading ? "Chargement..." : car?.status} |{" "}
          {loading ? "Chargement..." : car?.mileage} km .{" "}
          {loading ? "Chargement..." : car?.fuel} .{" "}
          {loading ? "Chargement..." : car?.transmission}
        </p>
      </header>
      <main className="flex-1 w-full flex flex-col sm:flex-row sm:items-start items-center p-3 gap-2">
        <div className="w-full sm:w-1/2 lg:w-2/3 flex flex-col gap-2">
          <div className="flex flex-col w-full gap-1 lg:h-130 bg-white">
            <span className="relative h-60 lg:h-full w-full border border-gray-200">
              {loading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              ) : (
                <Image
                  src={car?.photos[0]?.image_url as string}
                  alt={car?.photos[0]?.image_url as string}
                  fill
                  sizes="(max-width: 640px) 70vw"
                  className="object-cover"
                />
              )}
            </span>
            <span className="grid grid-cols-4 grid-rows-1 gap-1 p-2">
              <span className="relative h-20 lg:h-30 w-full scale-90 ring ring-emerald-700 p-3">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <Image
                    src={car?.photos[1]?.image_url as string}
                    alt={car?.photos[1]?.image_url as string}
                    fill
                    sizes="(max-width: 640px) 30vw"
                  />
                )}
              </span>
              <span className="relative h-20 lg:h-30 w-full border border-gray-200">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <Image
                    src={car?.photos[2]?.image_url as string}
                    alt={car?.photos[2]?.image_url as string}
                    fill
                    sizes="(max-width: 640px) 30vw"
                  />
                )}
              </span>
              <span className="relative h-20 lg:h-30 w-full border border-gray-200">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <Image
                    src={car?.photos[3]?.image_url as string}
                    alt={car?.photos[3]?.image_url as string}
                    fill
                    sizes="(max-width: 640px) 30vw"
                  />
                )}
              </span>
              <span className="relative h-20 lg:h-30 w-full border border-gray-200">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <Image
                    src={car?.photos[4]?.image_url as string}
                    alt={car?.photos[4]?.image_url as string}
                    fill
                    sizes="(max-width: 640px) 30vw"
                  />
                )}
              </span>
            </span>
          </div>
          <Accordion title="Description du vehicule">
            <span>
              <ul className="px-3">
                <li className="list-disc py-1">
                  {loading
                    ? "Chargement..."
                    : `Superbe ${car?.brand} ${car?.model} ${car?.year} en excellent
                      etat.`}
                </li>
                <li className="list-disc py-1">Moteur 2.0L 184 ch</li>
                <li className="list-disc py-1">Interieure cuir sport</li>
                <li className="list-disc py-1">Systeme de navigation GPS</li>
                <li className="list-disc py-1">
                  Carnet d&apos;entretien a jour
                </li>
                <li className="px-3 py-1.5 bg-emerald-800 rounded-md text-white text-center font-bold w-30">
                  Disponible
                </li>
              </ul>
            </span>
          </Accordion>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 grid grid-cols-2 sm:grid-cols-1 gap-1 place-items-center">
          <Accordion title="Details du vehicule">
            <span className="border-b border-gray-300 flex justify-between items-center p-1">
              <p className="text-start">Annee:</p>
              <p className="text-end font-bold">
                {loading ? "Chargement..." : car?.year}
              </p>
            </span>
            <span className="border-b border-gray-300 flex justify-between items-center p-1">
              <p className="text-start">Kilometrage:</p>
              <p className="text-end font-bold">
                {loading ? "Chargement..." : car?.mileage}
              </p>
            </span>
            <span className="border-b border-gray-300 flex justify-between items-center p-1">
              <p className="text-start">Carburant:</p>
              <p className="text-end font-bold">
                {loading ? "Chargement..." : car?.fuel}
              </p>
            </span>
            <span className="border-b border-gray-300 flex justify-between items-center p-1">
              <p className="text-start">Transmission:</p>
              <p className="text-end font-bold">
                {loading ? "Chargement..." : car?.transmission}
              </p>
            </span>
            <span className="border-b border-gray-300 flex justify-between items-center p-1">
              <p className="text-start">Puissance:</p>
              <p className="text-end font-bold">184 ch</p>
            </span>
            <span className="border-b border-gray-300 flex justify-between items-center p-1">
              <p className="text-start">Localisation:</p>
              <p className="text-end font-bold">Paris</p>
            </span>
          </Accordion>
          <Accordion title="Prix et Contact">
            <span className="flex flex-col">
              <h1 className="w-full text-2xl text-center py-2 font-black text-emerald-800">
                {loading ? "Chargement..." : car?.price?.toLocaleString()} Fcfa
              </h1>
              <ButtonContact
                id={car ? car?._id : ""}
                sellerPhone={seller?.phone || "698902641"}
              />
            </span>
            <span className="flex flex-col">
              <span className=" flex gap-2 items-center justify-start py-2">
                <User /> {loading ? "Chargement..." : seller?.name}
              </span>
              <span className=" flex gap-2 items-center justify-start py-2">
                <Phone /> Tel: {loading ? "Chargement..." : seller?.phone}
              </span>
              <span className=" flex gap-2 items-center justify-start py-2">
                <Mail /> {loading ? "Chargement..." : seller?.email}
              </span>
            </span>
          </Accordion>
        </div>
      </main>
      <footer className="w-full border-t border-gray-300 flex flex-col items-center justify-center py-5">
        <div className="flex gap-1 items-center justify-center py-2 w-full">
          {/* Pagination */}
          <button className="bg-white text-emerald-800 rounded-md p-1 hover:bg-emerald-800 hover:text-white size-9">
            <ChevronLeft />
          </button>
          <button className="bg-emerald-800 text-white rounded-md p-1 hover:bg-emerald-800 hover:text-white size-9">
            1
          </button>
          <button className="bg-white rounded-md p-1 hover:bg-emerald-800 hover:text-white size-9">
            2
          </button>
          <button className="bg-white rounded-md p-1 hover:bg-emerald-800 hover:text-white size-9">
            3
          </button>
          <button className="bg-white rounded-md p-1 hover:bg-emerald-800 hover:text-white size-9">
            --
          </button>
          <button className="bg-white text-emerald-800 rounded-md p-1 hover:bg-emerald-800 hover:text-white size-9">
            <ChevronRight />
          </button>
        </div>
        <Link
          href="/v1/Annonces"
          className="bg-emerald-800 text-white py-2 px-4 rounded-md my-2 hover:bg-emerald-700 shadow-xs shadow-emerald-900"
        >
          Retour aux Annonces
        </Link>
      </footer>
    </section>
  );
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

function Accordion({ title, children }: AccordionProps) {
  return (
    <div className="w-full rounded-md bg-white border border-gray-300 p-3 flex flex-col">
      <h1 className="border-b border-gray-300 px-2 font-bold text-xl">
        {title}
      </h1>
      <span>{children}</span>
    </div>
  );
}
