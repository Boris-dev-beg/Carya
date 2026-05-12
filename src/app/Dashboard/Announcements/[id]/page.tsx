"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ? Creation du type voiture
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
  price: number;
  description: string;
  status?: string;
  date?: string;
};
// ? Creation de la voiture par defaut
const defaultCar = {
  brand: "BMW",
  year: "2021",
  model: "Serie S4",
  photos: [
    {
      image_url: "/car_Image/audi.jpeg",
    },
  ],
  mileage: "45 000",
  transmission: "Automatique",
  fuel: "Diesel",
  description:
    "Superbe Audi Serie 3 2020 en excelent etat, faible kilometrage, entretien complet. nombreuse options !",
  price: 120000,
};

// ? Recuperation de la voiture avec l'ID passer en parametre
const getCar = async (id: string) => {
  try {
    const res = await fetch(`/api/cars/${id}`, {
      cache: "reload",
    });

    if (!res.ok) throw new Error(`Can't find this car with ID: ${id}`);
    const car = await res.json();
    console.log("Car in the function:", car);
    return car;
  } catch (err) {
    console.log("Error while getting this car:", err);
    return;
  }
};

export default function EditAnnounce() {
  // ! Etats / States
  const route = useRouter()
  const [car, setCar] = useState<Car>();
  const params = useParams();
  const id = params.id as string;
  const [formData, setFormData] = useState<Car>(defaultCar);
  const [title, setTitle] = useState<string>("Nom de la voiture");

  // ! Comportements / Functions
  useEffect(() => {
    const fetchCar = async () => {
      const car = await getCar(id);

      if (!car) return;
      setCar(car);
      setFormData(car);
      setTitle(car?.brand + " " + car?.model + " " + car?.year);
    };
    fetchCar();
  }, [id]);

  // ? Mise a jour des valeurs du formulaire
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;

      const onlyNumbers = value.replace(/\D/g, "");
      // On convertit en nombre
      const numericValue = onlyNumbers ? parseInt(onlyNumbers, 10) : 0;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? numericValue: value,
    }));
    console.log("Valeur: ", value);
  };

  // ? Soumission du formulaire
  const handleSubmit = async(e: React.SubmitEvent) => {
    e.preventDefault()
    try{
      const res = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if(res.ok)
        route.push('/Dashboard/Announcements')
      
      return
    }catch(err){
      console.log("Sorry we can't edit this car now. Please try again later. Error:",err)
      return
    }
  }

  // ! Affichages / Rendus
  return (
    <form onSubmit={handleSubmit}>
      <main className="flex items-center justify-center w-full">
        <form className="flex flex-col items-center gap-2 justify-center py-2 w-full md:w-4/5 px-2 bg-white">
          <div className="flex flex-col w-full">
            <span className="flex items-center justify-between pb-1 w-full">
              <h1 className="font-bold text-xl">Photo du vehicule</h1>
              <button className="flex items-center gap-2 px-2 hover:border-b border-gray-500">
                Ajouter des photos <Plus />
              </button>
            </span>
            <div className="flex items-start justify-center gap-2 w-full">
              <span className="relative w-50 md:w-125 h-55">
                <Image
                  src={car ? car?.photos[0]?.image_url : "/car_Image/audi.jpeg"}
                  alt={
                    (car?.photos[0]?.image_url as string) || "Image non trouvee"
                  }
                  fill
                  loading="eager"
                  sizes="(max-width: 640px) 45vw"
                  className="object-cover"
                />
              </span>
              <div className="flex-1 flex flex-col items-center justify-between h-full gap-2">
                <span className="grid grid-cols-2 md:grid-cols-4 gap-1 place-items-center w-full h-full">
                  <span className="relative w-25 h-20 md:w-33.5 md:h-30">
                    <Image
                      src={
                        car ? car?.photos[1]?.image_url : "/car_Image/audi.jpeg"
                      }
                      alt={
                        (car?.photos[1]?.image_url as string) ||
                        "Image non trouvee"
                      }
                      fill
                      sizes="(max-width: 640px) 30vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="relative w-25 h-20 md:w-33.5 md:h-30 ">
                    <Image
                      src={
                        car ? car?.photos[2]?.image_url : "/car_Image/audi.jpeg"
                      }
                      alt={
                        (car?.photos[2]?.image_url as string) ||
                        "Image non trouvee"
                      }
                      fill
                      sizes="(max-width: 640px) 30vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="relative w-25 h-20 md:w-33.5 md:h-30 ">
                    <Image
                      src={car?.photos[3]?.image_url || "/car_Image/audi.jpeg"}
                      alt={
                        (car?.photos[3]?.image_url as string) ||
                        "Image non trouvee"
                      }
                      fill
                      sizes="(max-width: 640px) 30vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="relative w-25 h-20 md:w-33.5 md:h-30">
                    <Image
                      src={car?.photos[0]?.image_url || "/car_Image/audi.jpeg"}
                      alt={
                        (car?.photos[0]?.image_url as string) ||
                        "Image non trouvee"
                      }
                      fill
                      sizes="(max-width: 640px) 30vw"
                      className="object-cover"
                    />
                  </span>
                </span>
                <button className="py-2 px-5 text-center rounded-xs border border-gray-400 bg-gray-200 hover:bg-gray-100">
                  Changer la photo principale
                </button>
              </div>
            </div>
          </div>
          <Item titre="Titre de l'Annonce">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 bg-white rounded-xs w-full p-2"
            />
          </Item>
          <div className="flex items-center justify-between gap-2 p-1 md:justify-start w-full">
            <span className="flex flex-col gap-1 w-full md:w-70">
              <h1 className="font-bold text-xl w-full text-start">Marque</h1>
              <select
                name="brand"
                onChange={handleChange}
                value={formData?.brand}
                className="border border-gray-300 rounded-xs bg-white px-2 py-1"
              >
                <option value="Audi">Audi</option>
                <option value="Bmw">BMW</option>
              </select>
            </span>
            <span className="flex flex-col gap-1 w-full md:w-70">
              <h1 className="font-bold text-xl w-full text-start">Modele</h1>
              <select
                name="model"
                onChange={handleChange}
                value={formData?.model}
                className="border border-gray-300 rounded-xs bg-white px-2 py-1"
              >
                <option value="serie">Serie 3</option>
                <option value="q5">Q5</option>
              </select>
            </span>
            <span className="flex flex-col gap-1 w-full md:w-70">
              <h1 className="font-bold text-xl w-full text-start">Annee</h1>
              <select
                name="year"
                onChange={handleChange}
                value={formData?.year}
                className="border border-gray-300 rounded-xs bg-white px-2 py-1"
              >
                <option value="2020">2020</option>
                <option value="2018">2018</option>
              </select>
            </span>
          </div>
          <Item titre="Prix (Fcfa)">
            <input
              type="text"
              name="price"
              onChange={handleChange}
              value={formData?.price?.toLocaleString("fr-FR")}
              className="p-2 border border-gray-300 bg-white rounded-xs w-full"
            />
          </Item>
          <Item titre="Description">
            <textarea
              cols={2}
              name="description"
              value={formData?.description}
              onChange={handleChange}
              className="resize-none border border-gray-300 bg-white rounded-xs p-2 w-full"
            />
          </Item>
          <Item titre="Caracteristiques">
            <div className="flex justify-between gap-2 p-1 h-full">
              <span className="flex flex-col w-full h-full gap-1 bg-white border border-gray-300 rounded-xs shadow shadow-gray-400">
                <h1 className="px-2 w-full text-start">Kilometre (km)</h1>
                <input
                  type="text"
                  name="mileage"
                  onChange={handleChange}
                  value={formData?.mileage}
                  className="border-t border-gray-300 rounded-xs px-2 w-full"
                />
              </span>
              <span className="flex flex-col w-full h-full gap-1 bg-white border border-gray-300 rounded-xs shadow shadow-gray-400">
                <h1 className="px-2 w-full text-start">Boite de vitesse</h1>
                <select
                  onChange={handleChange}
                  name="transmission"
                  value={formData?.transmission}
                  className="border-t border-gray-300 px-2 py-1 rounded-xs"
                >
                  <option value="auto">Automatique</option>
                  <option value="manuel">Manuel</option>
                </select>
              </span>
              <span className="flex flex-col w-full h-full gap-1 bg-white border border-gray-300 rounded-xs shadow shadow-gray-400">
                <h1 className="px-2 w-full text-start">Carburant</h1>
                <select
                  name="fuel"
                  onChange={handleChange}
                  value={formData?.fuel}
                  className="border-t border-gray-300 px-2 py-1 rounded-xs"
                >
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                </select>
              </span>
              <span className="flex flex-col w-full h-full gap-1 bg-white border border-gray-300 rounded-xs shadow shadow-gray-400">
                <h1 className="px-2 w-full text-start">Nombre de Portes</h1>
                <select className="border-t border-gray-300 px-2 py-1 rounded-xs">
                  <option value="4">4 Portes</option>
                  <option value="2">2 Portes</option>
                </select>
              </span>
            </div>
          </Item>
          <Item titre="Statut de l'Annonce">
            <div className="flex justify-between md:justify-start gap-3 items-center">
              <span className="flex items-center gap-2 w-full md:w-70">
                <input
                  onChange={handleChange}
                  value={formData?.status}
                  type="radio"
                  name="Statut"
                />
                <h1 className="">En Ligne</h1>
              </span>
              <span className="flex items-center gap-2 w-full md:w-70">
                <input
                  onChange={handleChange}
                  value={formData?.status}
                  type="radio"
                  name="Statut"
                />
                <h1 className="">En Attente</h1>
              </span>
              <span className="flex items-center gap-2 w-full md:w-70">
                <input
                  onChange={handleChange}
                  value={formData?.status}
                  type="radio"
                  name="Statut"
                />
                <h1 className="">Vendue</h1>
              </span>
            </div>
          </Item>
        </form>
      </main>
      <footer className="w-full py-4 flex items-center justify-center gap-4 border-t border-gray-300">
        <button className="border border-gray-300 rounded-md bg-white text-center text-black py-1 px-5">
          Annuler
        </button>
        <button type="submit" className="border border-emerald-800 rounded-md bg-emerald-800 text-white text-center py-1 px-5">
          Enregistrer
        </button>
      </footer>
    </form>
  );
}

const Item = ({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 py-1 w-full">
      <h1 className="font-bold text-xl w-full text-start">{titre}</h1>
      <span className="md:px-8">{children}</span>
    </div>
  );
};
