"use client";
import { GetUser } from "@/src/lib/GetUser";
import { CalendarDays, Mail, MapPin, Phone, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function Profil_Buyer() {
  // ! Etats / States
  const { data } = useSession();
  const email = data?.user?.email as string;
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("06 23 45 67 89");
  const location = "Bafoussam, Cameroun";

  // ! Comportements / Functions
  useEffect(() => {
    // ? recuperation des infos de l'utilisateur
    const fetchUser = async () => {
      if (!email) return;
      const data = await GetUser(email);
      if (data?.user) {
        setMessage(formatDate(data?.user?.createdAt as string));
        setPhone(data?.user?.phone);
      }
    };
    fetchUser();
  }, [email]);

  // ! Affichage / Render
  return (
    <section className="bg-gray-50 flex flex-col justify-center p-3 w-screen h-full max-w-full min-h-screen">
      <header className="flex flex-col items-center justify-center px-4">
        <h1 className="w-full py-2 text-center md:text-start md:pl-4 font-bold text-2xl md:text-3xl border-b border-gray-500">
          Mon Profil
        </h1>
        <p className="text-gray-500 border-b md:text-start md:pl-4  border-gray-500 w-full text-center py-2">
          Gerez vos conversation avec les vendeurs de vehicules.
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
                <h1 className="font-bold text-2xl">{data?.user?.name}</h1>
                <p>Acheteur</p>
              </span>
              <span className="w-full flex flex-col gap-2 py-2">
                <p className="flex items-center justify-start gap-2">
                  <Mail /> {data?.user?.email}
                </p>
                <p className="flex items-center justify-start gap-2">
                  <Phone />{" "}
                  {phone?.replace(
                    /(\d{3})(?=\d{3})/g,
                    "$1 ",
                  ) // ? Formater le numéro de téléphone en ajoutant des espaces tous les 3 chiffres
                  }
                </p>
                <p className="flex items-center justify-start gap-2">
                  <MapPin /> {location}
                </p>
                <p className="flex items-center justify-start gap-2">
                  <CalendarDays /> {message}
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
            <h1 className="font-bold text-xl">Historique d&apos;Achat</h1>
            <p>Vos vehicules achetes sur CARYA.</p>
          </div>
          <div className="grid grid-cols-1 w-full gap-3 py-2">
            {TabCars.map((car, index) => (
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
          href="/v1/Accueil"
          className="bg-emerald-800 text-white text-center hover:bg-emerald-600 rounded-md px-6 py-2 shadow-xs shadow-gray-800 transition-colors duration-300"
        >
          Retour a l&apos;Accueil
        </Link>
      </footer>
    </section>
  );
}

// const TabCars = [
//   {
//     src_image: "/car_image/bmw.jpeg",
//     name_car: "BMW Serie 3 2018",
//     date: "Aout 2021",
//     carburant: "Essence",
//     transmission: "Automatique",
//     kilometrage: "55 000",
//   },
//   {
//     src_image: "/car_image/toyo.jpeg",
//     name_car: "Toyota 208 2017",
//     date: "Janv. 2020",
//     carburant: "Diesel",
//     transmission: "Manuel",
//     kilometrage: "30 500",
//   },
//   {
//     src_image: "/car_image/audi.jpeg",
//     name_car: "Audi Tiguan 2015",
//     date: "Oct. 2016",
//     carburant: "Essence",
//     transmission: "Automatique",
//     kilometrage: "85 000",
//   },
//   {
//     src_image: "/car_image/kia.jpeg",
//     name_car: "Kia A4 2017",
//     date: "Sept. 2014",
//     carburant: "Diesel",
//     transmission: "Automatique",
//     kilometrage: "90 500",
//   },
// ];
const TabCars = [
  {
    src_image: "",
    name_car: "",
    date: "",
    carburant: "",
    transmission: "",
    kilometrage: "",
  },
];

interface CardProps {
  car: {
    src_image: string;
    name_car: string;
    date: string;
    carburant: string;
    transmission: string;
    kilometrage: string;
  };
}

function Car({ car }: CardProps) {
  if (!car.src_image || !car.name_car) {
    return null; // ? Si les données de la voiture sont invalides, ne rien afficher
  }
  return (
    <div className="flex items-center justify-center shadow-md shadow-gray-300 w-full md:h-40">
      <span className="relative w-1/3 h-full rounded-l-md">
        <Image
          src={car.src_image}
          alt={car.src_image}
          fill
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 60vw"
          className="object-cover rounded-l-md"
        />
      </span>
      <span className="w-2/3 py-2 px-2 rounded-r-md bg-emerald-50 h-full">
        <h1 className="text-xl font-bold">{car.name_car}</h1>
        <p className="py-2">Acheter en {car.date}</p>
        <p className="py-2 font-bold border-t border-gray-500">
          {car.kilometrage} Km . {car.carburant} . {car.transmission}
        </p>
      </span>
    </div>
  );
}
