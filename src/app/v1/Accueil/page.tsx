"use client";
import Card from "@/src/components/Card";
import Loading from "@/src/components/load/loading";
import { getCars } from "@/src/lib/GetCars";
import { GetUser } from "@/src/lib/GetUser";
import {
  CarFront,
  LucideIcon,
  MessagesSquareIcon,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";

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

// const Tabcars: Cars[] = [
//   {
//     _id: "",
//     photos: [
//       {
//         image_url: "/car_Image/feature-car4.png",
//       },
//     ],
//     status: "Promotion",
//     transmission: "Manuel",
//     brand: "Mercedeces",
//     model: "C 220 ",
//     year: "2017",
//     price: 240900,
//     mileage: "90 500",
//     fuel: "Diesel",
//   },
//   {
//     _id: "",
//     photos: [
//       {
//         image_url: "/car_Image/feature-car2.png",
//       },
//     ],
//     status: "Promotion",
//     transmission: "Manuel",
//     brand: "Mercedeces",
//     model: "C 220 ",
//     year: "2017",
//     price: 240900,
//     mileage: "90 500",
//     fuel: "Diesel",
//   },
//   {
//     _id: "",
//     photos: [
//       {
//         image_url: "/car_Image/feature-car1.png",
//       },
//     ],
//     status: "Promotion",
//     transmission: "Manuel",
//     brand: "Mercedeces",
//     model: "C 220 ",
//     year: "2017",
//     price: 240900,
//     mileage: "90 500",
//     fuel: "Diesel",
//   },
// ];
const Tabcars: Cars[] = [
  {
    _id: "",
    photos: [
      {
        image_url: "",
      },
    ],
    status: "",
    transmission: "",
    brand: "",
    model: "",
    year: "",
    price: null as unknown as number,
    mileage: "",
    fuel: "",
  },
];

export default function Accueil() {
  // ! States / Etats
  const { data } = useSession(); // ? Donnnees de la session active
  const email = data?.user?.email as string; // ? Email de la session
  const [role, setRole] = useState("buyer");
  const [cars, setCars] = useState<
    Cars[]
  >(Tabcars);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // ! Comportements / Fonctions
  // ? Filtrage du tableau de voiture
  const newCarList: Cars[] = cars.filter(
    (car) =>
      searchValue === "" ||
      Object.values(car).some((val) =>
        String(val).toLowerCase().includes(searchValue.toLowerCase()),
      ),
  );

  // ? Recuperation de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      if (!email) return;
      const data = await GetUser(email);
      if (data?.user) {
        setRole(data.user.role);
      }
    };
    fetchUser();
  }, [email]);

  // ? recuperation des voitures
  useEffect(() => {
    const fetchCars = async () => {
      const cars: Cars[] = await getCars();
      setCars((prev) => [...prev, ...cars]);
      setIsLoading(false);
      console.log("Cars: ", cars);
    };
    fetchCars();
  }, []);

  console.log("Active role:", role);
  // ! Affichage / Rendu
  return (
    <section className="w-full">
      <HERO value={searchValue} setValue={(a) => setSearchValue(a)} />
      <div className="flex flex-col w-full p-10 gap-3">
        <h1 className="text-4xl font-bold pl-2 lg:pl-4 text-emerald-700">
          Meilleurs Annonces
        </h1>
        {isLoading ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
            <Best Cars={newCarList} />
          </Suspense>
        )}
      </div>
      <div className="w-full relative border-t-2 border-emerald-700 flex flex-col my-7 pt-20 items-center justify-center">
        <h1 className="font-bold absolute -top-3 bg-gray-200 text-emerald-700 text-2xl lg:text-3xl px-3">
          Pourquoi choisir CARYA ?
        </h1>
        <About />
      </div>
      <div className="w-full pt-0.5 my-14 bg-linear-to-l/oklch to-transparent via-emerald-800 from-transparent">
        <div className="w-full bg-gray-200 relative flex flex-col pt-10 items-center justify-center">
          <h1 className="font-bold absolute -top-6 bg-gray-200 text-emerald-700 text-2xl lg:px-3">
            Decouvrez toutes nos annonce de voitures
          </h1>
          <Link
            href="/v1/Annonces"
            className="px-5 py-3 bg-emerald-900 hover:bg-emerald-700 transition-colors duration-300 text-white font-bold rounded-md"
          >
            Voir toutes les annonces
          </Link>
        </div>
      </div>
    </section>
  );
}

function HERO({
  value,
  setValue,
}: {
  value: string;
  setValue: (a: string) => void;
}) {
  return (
    <div className="w-full lg:h-110 h-100 relative">
      <div className="absolute z-0 w-full h-full">
        <Image
          src={"/banner.png"}
          alt="Banner Image"
          fill
          loading="eager" // ? Charger l'image immédiatement
          sizes="(max-width: 768px) 100vw"
          className="lg:w-full lg:h-full"
        />
        <div className="absolute inset-0 bg-linear-to-l to-white/30 from-transparent"></div>
      </div>
      <div className="text-white absolute lg:z-10 w-full h-full p-5 lg:p-10">
        <span className="p-5 lg:p-10 flex flex-col justify-center items-start gap-3">
          <h1 className="text-5xl font-black">
            Trouvez la voiture de vos reves
          </h1>
          <p className="max-w-2xl text-lg">
            Appuyez et contactez facilement les vendeurs proche de chez vous
          </p>
        </span>
        <span className="lg:p-10 w-full flex flex-col items-center justify-center">
          <Input value={value} setValue={(e: string) => setValue(e)} />
        </span>
      </div>
    </div>
  );
}

function Input({
  value,
  setValue,
}: {
  value: string;
  setValue: (a: string) => void;
}) {
  // ! States / Etats
  // ! Comportements / Fonctions
  // ! Affichage / Rendu
  return (
    <div className="flex flex-col bg-white text-black rounded-md w-full lg:w-2/3">
      <span className="flex items-center w-full gap-2 p-2">
        <button className="p-3 flex items-center justify-center transition-colors duration-300">
          <Search />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value as string)}
          placeholder="Rechercher un vehicule..."
          className="pt-2 px-2 flex-1 outline-none focus:border-b"
        />
        <button className="p-3 bg-emerald-700 text-white rounded-md">
          Rechercher
        </button>
      </span>
      <span className="grid grid-cols-3 lg:flex gap-2 w-full items-center p-1">
        <select
          name=""
          id=""
          className="border border-gray-500 rounded-md p-3 w-full"
        >
          <option value="">Marque</option>
          <option value="">BMW</option>
          <option value="">Audi</option>
        </select>
        <select
          name=""
          id=""
          className="border border-gray-500 rounded-md p-3 w-full"
        >
          <option value="">Modele</option>
          <option value="">A3</option>
          <option value="">X5</option>
        </select>
        <select
          name=""
          id=""
          className="border border-gray-500 rounded-md p-3 w-full"
        >
          <option value="">Prix max</option>
          <option value="">200 000</option>
          <option value="">500 000</option>
        </select>
        <select
          name=""
          id=""
          className="border border-gray-500 rounded-md p-3 w-full"
        >
          <option value="">Annee</option>
          <option value="">2010</option>
          <option value="">2020</option>
        </select>
        <select
          name=""
          id=""
          className="border border-gray-500 rounded-md p-3 w-full"
        >
          <option value="">Kilometrage max</option>
          <option value="">100 Km</option>
          <option value="">180 Km</option>
        </select>
      </span>
    </div>
  );
}

function Best({ Cars }: {Cars: Cars[]}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center">
      {Cars.map((car, index) => (
        <Card key={index} car={car} />
      ))}
    </div>
  );
}

const aboutCard = [
  {
    icon: CarFront,
    titre: "Large Choix de Voitures",
    description: "Des centaines d'annonces disponibles",
  },
  {
    icon: ShieldCheck,
    titre: "Transaction Securisee",
    description: "Achat en toute confiance",
  },
  {
    icon: MessagesSquareIcon,
    titre: "Contact Facile",
    description: "Echangez directement avec les vendeurs",
  },
];
function About() {
  return (
    <div className="w-[90%] lg:w-2/3 grid grid-cols-3 lg:px-10 gap-5 lg:gap-10 relative place-items-center bg-white shadow-md shadow-white/50 rounded-md p-3">
      {aboutCard.map((card, index) => (
        <AboutCard
          key={index}
          icon={card.icon}
          titre={card.titre}
          description={card.description}
        />
      ))}
    </div>
  );
}

interface Props {
  icon: LucideIcon;
  titre: string;
  description: string;
}

function AboutCard({ icon: Icon, titre, description }: Props) {
  return (
    <span className="flex flex-col items-center text-center justify-center relative gap-2 h-40 pt-5">
      <Icon className="absolute -top-12 lg:-top-18 size-20 lg:size-30 text-emerald-950" />
      <span className="h-3/4 lg:h-2/3">
        <h1 className="font-bold text-emerald-800 text-base lg:text-2xl">
          {titre}
        </h1>
        <p>{description}</p>
      </span>
    </span>
  );
}
