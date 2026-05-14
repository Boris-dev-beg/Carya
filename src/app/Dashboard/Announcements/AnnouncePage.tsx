"use client";
import { useSession } from "next-auth/react";
import { CardAnnouncement } from "@/src/components/Card_Announcement";
import { useEffect, useState } from "react";
import { GetUser } from "@/src/lib/GetUser";
import Loading from "@/src/components/load/loading";

type Car = {
  brand: string;
  model: string;
  year: number;
  price: number;
  photos: [
    {
      image_url: string;
    },
  ];
  _id: string;
};
// ? Recuperation des voitures d'un vendeur
const GetCars = async (ownerId: string) => {
  if (!ownerId) {
    console.log("Owner ID est Undefine");
    return;
  }

  try {
    const response = await fetch("/api/cars/list", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ownerId }),
    }); // ? Envoie de l'id du vendeur pour recuperer ses voitures

    if (!response.ok)
      throw new Error(
        "Recuperation impossible des voitures du vendeur: " + ownerId,
      );

    const cars = await response.json();
    console.log("Cars dans la function GetCars", cars);
    return cars;
  } catch (err) {
    console.log("Impossible de recuperer les voitures:", err);
    return;
  }
};

export default function AnnounceSection() {
  // ! States / Etats
  const [cars, setCars] = useState<Car[]>();
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const email = data?.user?.email;
  console.log("Email hors du useEffect", email);

  // ! Comportements / Fonctions
  useEffect(() => {
    if (!email) return;
    const fetchCars = async () => {
      setLoading(true);
      const ownerId = await GetUser(email as string);
      const id = ownerId?.user?._id;
      console.log("Owner ID dans le useEffect:", id);
      console.log("Email dans le useEffect", email);
      const cars = await GetCars(id as string);
      setCars(cars);
      setLoading(false);
    };
    fetchCars();
  }, [email]);

  console.log("Cars finded:", cars);

  // ! Affichage / Rendus
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-1 place-items-center gap-5 px-3 py-1 md:px-30 w-full">
      {cars ? (
        cars?.map((car, index) => (
          <CardAnnouncement
            key={index}
            id={car?._id}
            src_image={car.photos[0].image_url}
            price={car.price}
            name={car.brand + " " + car.model + " " + car.year}
            status="En attente"
            views={0}
            msg={0}
          />
        ))
      ) : (
        <h1 className="text-2xl font-sans text-gray-500">
          Aucune annonce pour le moment
        </h1>
      )}
    </div>
  );
}

// const TabCard = [
//   {
//     src_image: "/car_Image/bmw.jpeg",
//     name: "BMW Serie 3 2020",
//     price: 24500,
//     status: "En Ligne",
//     views: 235,
//     msg: 15,
//   },
//   {
//     src_image: "/car_Image/kia.jpeg",
//     name: "KIA Q5 3 2024",
//     price: 44000,
//     status: "Vendue",
//     views: 99,
//     msg: 10,
//   },
//   {
//     src_image: "/car_Image/audi.jpeg",
//     name: "Audi A4 2017",
//     price: 21700,
//     status: "Vendue",
//     views: 310,
//     msg: 20,
//   },
//   {
//     src_image: "/car_Image/toyo.jpeg",
//     name: "TOYOTA 3008 2018",
//     price: 18900,
//     status: "En Attente",
//     views: 0,
//     msg: 0,
//   },
// ];
