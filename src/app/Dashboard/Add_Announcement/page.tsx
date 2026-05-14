"use client";
import Loading from "@/src/components/load/loading";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { GetUser } from "@/src/lib/GetUser";

export default function Add_Announcement() {
  // ! States / Etats
  const { data } = useSession();
  const PrevEmail = data?.user?.email as string;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: 0,
    mileage: 0,
    fuel: "",
    transmission: "",
    description: "",
    price: 0,
    state: "",
  });
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const dataForm = new FormData();

  // ! Comportements / Fonctions
  // ? Fonction d'ajout des photos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    // ? Limite à 6 photos
    if (selectedFiles.length + photos.length > 6) {
      setError("Vous pouvez ajouter jusqu'à 6 photos maximum.");
      alert("Nombre d'image maximun atteint");
      return;
    }

    setPhotos([...photos, ...selectedFiles]);
  };

  // ? Fonction d'envoie des donnees au backend
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    // ? verification de la validite des valeurs du formulaire
    const TabVal = Object.values(formData);
    const isNull = TabVal.some(
      (v) => (v as string) === "" || (v as number) <= 0,
    );

    if (!isNull) {
      // ? Si les valeurs sont null envoyer un message d'erreur
      setError("Veuillez remplire correctement les champs ! ");
      return;
    }
    setError("");
    const data = await GetUser(PrevEmail); // ? Recuperation des information sur l'utilisateur
    const ownerId = data?.user?._id; // ? Recuperation de son ID

    // ? Mise a jour de dataForm / des valeurs a envoyer au backend
    dataForm.append("brand", formData.brand);
    dataForm.append("model", formData.model);
    dataForm.append("mileage", formData.mileage.toString());
    dataForm.append("year", formData.year.toString());
    dataForm.append("fuel", formData.fuel);
    dataForm.append("transmission", formData.transmission);
    dataForm.append("description", formData.description);
    dataForm.append("price", formData.price.toString());
    dataForm.append("state", formData.state);
    dataForm.append("ownerId", ownerId);
    if (photos.length > 0) {
      photos.map((val) => dataForm.append("photos[]", val));
    }

    try {
      setLoading(true); // ? Activation de l'effet de loading lorsque les donnees sont en cours de traitement

      const response = await fetch("/api/cars", {
        method: "POST",
        body: dataForm,
      });
      if (!response.ok) {
        throw new Error("Failed to create a car");
      }
      router.push("/Dashboard");
    } catch (error) {
      console.log("Erreur de creation de la voiture:", error);
    } finally {
      setError("");
      setLoading(false);
    }
  };

  // ? Fonction de modification des valeurs du formulaire
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >, 
  ) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ? Fonction pour le retour au dashboard et annuler ajout de la voiture
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/Dashboard");
    }, 100);
  };

  // ! Affichage / Render
  if (loading) {
    return <Loading />;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-screen max-w-screen absolute inset-0 z-30 bg-white flex flex-col md:items-center px-4 py-3"
    >
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold py-1.5 border-b border-gray-400">
          Ajouter une Annonce
        </h1>
        {error ? (
          <p className="py-2 text-red-500 bg-white">{error}</p>
        ) : (
          <p className="py-2">
            Remplissez les informations de votre vehicule pour publier votre
            annonce.
          </p>
        )}
      </div>
      <div className="flex-1 md:w-2/3">
        <Step number={1} title="Informations du Vehicule">
          <span className="w-full py-2 flex items-center md:justify-start justify-center gap-2">
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="outline-none border border-gray-400 rounded-md p-2 w-full md:w-1/4"
            >
              <option value="">Marque</option>
              <option value="audi">Audi</option>
              <option value="bmw">BMW</option>
            </select>
            <select
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="outline-none border border-gray-400 rounded-md p-2 w-full md:w-1/4"
            >
              <option value="">Modele</option>
              <option value="serie">Serie</option>
              <option value="q5">Q5</option>
            </select>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="outline-none border border-gray-400 rounded-md p-2 w-full md:w-1/4"
            >
              <option value="">Annee</option>
              <option value="2010">2010</option>
              <option value="1955">1955</option>
            </select>
          </span>
          <span className="w-full flex items-center gap-2 py-2">
            <h1 className="py-2 w-full md:w-1/4">Kilometrage : </h1>
            <input
              type="text"
              name="mileage"
              value={formData.mileage.replace(/\D/g, "")} // ? Supprimer les caractères non numériques
              onChange={handleChange}
              placeholder="Indiquer les Km"
              className="border border-gray-400 rounded-md p-2 md:w-2/3 w-full"
            />
          </span>
          <span className="w-full flex items-center justify-start gap-2">
            <span className="w-full md:w-fit flex items-center gap-1">
              <p className="bg-emerald-800 rounded-full size-3"></p>
              <h1>Carburant : </h1>
            </span>
            <span className="w-full md:w-2/3 flex gap-3 items-center">
              <label
                htmlFor="essence"
                className="flex items-center text-center gap-2"
              >
                <input
                  type="radio"
                  id="essence"
                  name="fuel"
                  value="Essence"
                  onChange={handleChange}
                />{" "}
                Essence
              </label>
              <label
                htmlFor="diesel"
                className="flex items-center text-center gap-2"
              >
                <input
                  type="radio"
                  id="diesel"
                  name="fuel"
                  value="Diesel"
                  onChange={handleChange}
                />{" "}
                Diesel
              </label>
              <label
                htmlFor="hybride"
                className="flex items-center text-center gap-2"
              >
                <input
                  type="radio"
                  id="hybride"
                  name="fuel"
                  value="Hybride"
                  onChange={handleChange}
                />{" "}
                Hybride
              </label>
              <label
                htmlFor="electrique"
                className="flex items-center text-center gap-2"
              >
                <input
                  type="radio"
                  id="electrique"
                  name="fuel"
                  value="Electrique"
                  onChange={handleChange}
                />{" "}
                Electrique
              </label>
            </span>
          </span>
          <span className="w-full flex justify-start items-center gap-2">
            <span className="w-full md:w-fit flex items-center gap-1">
              <p className="bg-emerald-800 rounded-full size-3"></p>
              <h1>Transmission : </h1>
            </span>
            <span className="w-full md:w-2/3 flex gap-3 items-center">
              <label
                htmlFor="auto"
                className="flex items-center text-center gap-2"
              >
                <input
                  type="radio"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  id="auto"
                />{" "}
                Automatique
              </label>
              <label
                htmlFor="manuelle"
                className="flex items-center text-center gap-2"
              >
                <input
                  type="radio"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  id="manuelle"
                />{" "}
                Manuelle
              </label>
            </span>
          </span>
        </Step>
        <Step number={2} title="Photos du Vehicule">
          <>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-emerald-800">
              <span className="text-gray-600 flex gap-3 items-center justify-center w-full text-center">
                <Camera /> Ajouter des Photos
              </span>
              <span className="text-sm text-gray-400 text-center w-full">
                Ajouter jusqu’à 6 photos
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Aperçu des photos */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {photos.map((photo, index) => (
                <span key={index} className="w-full h-24 relative">
                  <Image
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    sizes="(max-width: 640px) 50vw"
                    fill
                    className="object-cover rounded-md"
                  />
                </span>
              ))}
            </div>
          </>
        </Step>
        <Step number={3} title="Details et Prix">
          <span className="w-full p-2 border border-gray-400 rounded-md flex flex-col items-center justify-start md:items-start gap-2">
            <h1>Description: </h1>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Decrivez votre vehicule..."
              className="outline-none py-1 px-1.5 w-full"
            />
          </span>
          <span className="flex items-center py-1 w-full">
            <h1>Prix: </h1>
            <button className="border border-gray-400 ml-2 px-2 py-1 rounded-md rounded-r-none font-black">
              Fcfa
            </button>
            <input
              name="price"
              value={formData.price.replace(/\D/g, "")} // ? Supprimer les caractères non numériques
              onChange={handleChange}
              type="text"
              className="outline-none border border-gray-400 px-2 py-1 rounded-md rounded-l-none border-l-0"
            />
          </span>
          <span className="w-full flex items-center gap-2">
            <h1>Etat: </h1>
            <span className="w-full flex gap-3 items-center">
              <label
                htmlFor="vendre"
                className="flex items-center text-center gap-2"
              >
                <input
                  type="radio"
                  name="state"
                  value="A vendre"
                  onChange={handleChange}
                  id="vendre"
                />{" "}
                A vendre
              </label>
              <label
                htmlFor="promo"
                className="flex items-center text-center gap-2"
              >
                <input
                  type="radio"
                  name="state"
                  value="En promo"
                  onChange={handleChange}
                  id="promo"
                />{" "}
                En Promotion
              </label>
            </span>
          </span>
        </Step>
      </div>
      <div className="flex items-center justify-center gap-2 py-6 w-full">
        <button
          type="submit"
          className="bg-emerald-800 hover:bg-emerald-700 transition-colors duration-300 text-white py-2 px-6 text-center rounded-md shadow shadow-emerald-900 font-bold"
        >
          Publier l&apos;Annonce
        </button>
        <button
          onClick={handleClick}
          className="px-3 py-1.75 text-center bg-gray-200 border border-gray-300 rounded-md shadow shadow-gray-400"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

const Step = ({ number, title, children }: StepProps) => {
  return (
    <div className="border-t border-gray-400 py-2 flex flex-col">
      <span className="w-full border-b border-gray-400 pb-1 px-2 flex gap-4 items-center">
        <h1 className="rounded-full bg-emerald-800 text-white py-1.25 px-3.5 text-xl">
          {number}
        </h1>
        <h1 className="font-bold text-xl">{title}</h1>
      </span>
      <div className="py-2">{children}</div>
    </div>
  );
};
