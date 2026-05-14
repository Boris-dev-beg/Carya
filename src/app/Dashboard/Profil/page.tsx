"use client";
import {
  CalendarDays,
  ClipboardPlus,
  Mail,
  MapPin,
  Phone,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Car } from "@/src/components/Car_Seller";

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

// ! Recuperation des infos du vendeur et ses voitures
const GetUser = async (email: string) => {
  try {
    const res = await fetch(`/api/getUser`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || "Can't find user : Fatale error");
    return data;
  } catch (err) {
    console.log("Error Finded:", err);
    return;
  }
};
const getCars = async (ownerId: string) => {
  try {
    const response = await fetch(`/api/cars/list`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ownerId }),
    });

    if (!response.ok) throw new Error("Can't find Your cars");

    const cars = await response.json();

    return cars;
  } catch (err) {
    console.log("Error while getting Car Info", err);
    return;
  }
};
// ? Fonction pour formater une date en format "Mois Année" ou Aujourd'hui si la date correspond à la date actuelle
const formatDate = (dateString: string) => {
  const date = new Date(dateString); // ? Ex: 2021-08-15T12:00:00Z

  // ? Date actuelle
  const now = new Date(); // ? Ex: 2024-08-15T12:00:00Z

  // ? Vérifier si c'est le même jour
  const isToday =
    date.getDate() === now.getDate() && // ? Si le jour correspond
    date.getMonth() === now.getMonth() && // ? Si le mois correspondent
    date.getFullYear() === now.getFullYear(); // ? Si la date correspond à aujourd'hui

  let message; // ? Message à afficher
  if (isToday) {
    message = "Membre depuis aujourd'hui"; // ? Si c'est aujourd'hui, afficher "Membre depuis aujourd'hui"
  } else {
    // ? Formatter mois et année
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    }; // ? Ex: { month: "long", year: "numeric" } => "Aout 2021"

    const formatted = date.toLocaleDateString("fr-FR", options); // ? Ex: "Aout 2021"
    message = `Membre depuis ${formatted}`; // ? Ex: "Membre depuis Aout 2021"
  }

  return message; // ? Retourne le message formaté
};

// ? Tableau de voitures par defaut
const TabCars: Car[] = [
  {
    status: "En Ligne",
    photos: [
      {
        image_url: "/car_image/bmw.jpeg",
      },
    ],
    brand: "BMW",
    model: "Serie 3",
    year: "2018",
    date: "Aout 2021",
    fuel: "Essence",
    transmission: "Automatique",
    mileage: "55 000",
  },
  {
    status: "En Attente",
    photos: [
      {
        image_url: "/car_image/audi.jpeg",
      },
    ],
    brand: "Audi",
    model: "Tiguan",
    year: "2015",
    date: "Oct. 2016",
    fuel: "Essence",
    transmission: "Automatique",
    mileage: "85 000",
  },
  {
    status: "Vendue",
    photos: [
      {
        image_url: "/car_image/kia.jpeg",
      },
    ],
    brand: "Kia",
    model: "A4",
    year: "2017",
    date: "Sept. 2014",
    fuel: "Diesel",
    transmission: "Automatique",
    mileage: "90 500",
  },
];

export default function Profil_Seller() {
  // ! Etats / States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const { data } = useSession();
  const PrevEmail = data?.user?.email as string;
  const [tabCars, setTabCars] = useState<Car[]>(TabCars);

  // ! Comportements / Functions
  useEffect(() => {
    const fetchInfos = async () => {
      if (!PrevEmail) return;
      const seller = await GetUser(PrevEmail);
      if (seller?.user) {
        setName(seller.user.name);
        setEmail(seller.user.email);
        setPhone(seller.user.phone);
        setJoinDate(formatDate(seller.user.createdAt as string));
        const Cars = await getCars(seller?.user?._id);
        setTabCars([...Cars]);
      }
    };
    fetchInfos();
  }, [PrevEmail]);

  console.log("Vos voitures: ", tabCars);
  // ! Affichage / Rendu
  return (
    <section className="bg-gray-50 flex flex-col justify-center p-3 w-screen h-full max-w-full min-h-screen">
      <header className="flex flex-col items-center justify-center px-4">
        <h1 className="w-full py-2 text-center md:text-start md:pl-4 font-bold text-2xl md:text-3xl border-b border-gray-500">
          Mon Profil
        </h1>
        <p className="text-gray-500 border-b md:text-start md:pl-4  border-gray-500 w-full text-center py-2">
          Gerez vos ventes de vehicules en toute simplicite.
        </p>
      </header>
      <main className="flex-1 flex flex-col md:flex-row md:gap-2 w-full py-2">
        <div className="flex flex-col py-3 bg-white border-b md:px-2 md:h-fit md:border border-gray-400">
          <div className="flex flex-row md:flex-col items-center justify-center gap-2 p-2">
            <span className="relative rounded-full w-60 md:w-40 h-40 border-2 border-gray-400">
              <Image
                src="/avatars/cartoon_man_1.jpg"
                alt="cartoon_man_1.jpg"
                fill
                sizes="(max-width: 640px) 30vw"
                className="object-cover rounded-full"
              />
            </span>
            <span className="flex flex-col w-full">
              <span className="w-full border-b border-gray-400 py-3 md:text-center">
                <h1 className="font-bold text-2xl">{name}</h1>
                <p>Vendeur Professionnel</p>
              </span>
              <span className="w-full flex flex-col gap-2 py-2">
                <p className="flex items-center justify-start gap-2">
                  <Mail /> {email}
                </p>
                <p className="flex items-center justify-start gap-2">
                  <Phone />{" "}
                  {
                    phone ? phone.replace(/(\d{3})(?=\d{3})/g, "$1 ") : null // ? Formater le numéro de téléphone en ajoutant des espaces tous les 3 chiffres
                  }
                </p>
                <p className="flex items-center justify-start gap-2">
                  <MapPin /> Bafoussam, Cameroun
                </p>
                <p className="flex items-center justify-start gap-2">
                  <CalendarDays /> {joinDate}
                </p>
              </span>
            </span>
          </div>
          <button className="px-6 py-2 text-center text-white bg-emerald-800 rounded-md hover:bg-emerald-700">
            Modifier Mon Profil
          </button>
        </div>
        <div className="bg-white flex flex-col justify-center md:w-2/3 md:px-10">
          <div className="flex flex-col items-center justify-center gap-1 py-4 border-b border-gray-400">
            <h1 className="font-bold text-xl">Mes Annonces Actuelle</h1>
            <p>Vos vehicules en vente sur CARYA.</p>
          </div>
          <div className="grid grid-cols-1 w-full gap-3 py-2">
            {tabCars.map((car, index) => (
              <Car key={index} car={car} />
            ))}
          </div>
        </div>
      </main>
      <footer className="flex items-center w-full justify-center gap-4 border-t border-gray-400 py-2">
        <form className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Recherchez une conversation..."
            className="outline-none focus:border-emerald-800 focus:border rounded-l-md px-2 py-1.5 w-full"
          />
          <button className="bg-emerald-800 hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center text-white rounded-r-md h-full px-2 py-1.75">
            <Search />
          </button>
        </form>
        <Link
          href="/Dashboard/Add_Announcement"
          className="flex items-center justify-center gap-2 shadow-md shadow-green-700 rounded-md py-3 px-3 text-white bg-emerald-800 hover:bg-emerald-700 hover:shadow-emerald-600 transition-colors duration-300"
        >
          <ClipboardPlus /> Deposer une annonce
        </Link>
      </footer>
    </section>
  );
}
