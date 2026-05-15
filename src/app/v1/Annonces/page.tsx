"use client";
import { CarCard } from "@/src/components/Car_Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCars } from "@/src/lib/GetCars";
import { useEffect, useState } from "react";
import Loading from "@/src/components/load/loading";

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
//         image_url: "/car_Image/product-2.jpg",
//       },
//     ],
//     status: "Promotion",
//     transmission: "Manuel",
//     brand: "VW",
//     model: "Golft",
//     year: "2019",
//     price: 218500,
//     mileage: "40 500",
//     fuel: "Diesel",
//   },
//   {
//     _id: "",
//     photos: [
//       {
//         image_url: "/car_Image/product-4.jpg",
//       },
//     ],
//     status: "Disponible",
//     transmission: "Automatique",
//     brand: "BMW",
//     model: "Serie 3",
//     year: "2020",
//     price: 225500,
//     mileage: "75 500",
//     fuel: "Essence",
//   },
//   {
//     _id: "",
//     photos: [
//       {
//         image_url: "/car_Image/product-1.jpg",
//       },
//     ],
//     status: "Reservee",
//     transmission: "Automatique",
//     brand: "Audi",
//     model: "Q5",
//     year: "2018",
//     price: 228000,
//     mileage: "95 500",
//     fuel: "Diesel",
//   },
//   {
//     _id: "",
//     photos: [
//       {
//         image_url: "/car_Image/product-5.jpg",
//       },
//     ],
//     status: "Nouveau",
//     transmission: "Automatique",
//     brand: "Mercedes",
//     model: "GLC",
//     year: "2021",
//     price: 238000,
//     mileage: "30 500",
//     fuel: "Hybride",
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

export default function Annonces() {
  // ! States / Etats
  const [cars, setCars] = useState<Cars[]>(Tabcars);
  const [loading, setLoading] = useState(true); // ? State pour stocker l'etat de chargement des voitures

  // ! Fonctions / Comportements
  // ? recuperation des voitures
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true); // ? On set l'etat de chargement a true avant de recuperer les infos des voitures

      const cars = await getCars();
      setCars((prev) => [...prev, ...cars]);
      console.log("Cars: ", cars);

      setLoading(false); // ? On set l'etat de chargement a false une fois les infos recuperées
    };
    fetchCars();
  }, []);

  // ! Affichages / Rendus
  return (
    <div className="flex flex-col items-center justify-between max-h-screen h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center w-full md:px-10 py-3 gap-3 overflow-y-auto">
        {loading ? (
          <Loading />
        ) : cars ? (
          cars.map((car, index) => <CarCard key={index} car={car} />)
        ) : (
          <p>Aucune voiture disponible</p>
        )}
      </div>
      <div className="flex gap-1 items-center justify-center py-2">
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
    </div>
  );
}
