import { Button } from "@mui/material";
import Link from "next/link";
import Remove from "./Button";
import { getServerSession } from "next-auth";

interface Car {
  _id: string;
  title: string;
  description: string;
  image: string;
}
interface Owner {
  user: {
    _id: string;
  };
}

// const Cars = [
//   {
//     _id: "1",
//     title: "Audi",
//     description: "Voiture de luxe",
//   },
//   {
//     _id: "2",
//     title: "Audi",
//     description: "Voiture de luxe",
//   },
//   {
//     _id: "3",
//     title: "Audi",
//     description: "Voiture de luxe",
//   },
//   {
//     _id: "4",
//     title: "Audi",
//     description: "Voiture de luxe",
//   },
//   {
//     _id: "5",
//     title: "Audi",
//     description: "Voiture de luxe",
//   },
//   {
//     _id: "6",
//     title: "Audi",
//     description: "Voiture de luxe",
//   },
//   {
//     _id: "7",
//     title: "Audi",
//     description: "Voiture de luxe",
//   },
// ];

const getCars = async (ownerId: string) => {
  if (!ownerId) {
    console.log("Owner ID Undefine");
    return;
  }
  console.log("Owner ID function1:", ownerId);
  try {
    const response = await fetch("http://localhost:3000/api/cars/list", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ownerId }),
    });
    // const cars = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    const cars = await response.json();
    console.log("Owner cars:", cars);
    return cars;
  } catch (error) {
    console.log("Error catched :", error);
    return;
  }
};

const GetOwner = async (email: string): Promise<Owner | undefined> => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/userExists", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res) throw new Error("Utilisateur non confirmer");

    const owner = await res.json();
    return owner;
  } catch (err) {
    console.log("Erreur trouver:", err);
    return;
  }
};
export default async function listCar() {
  // ? recuperation de la session de l'utilisateur avant de selectionner ces voitures
  const data = await getServerSession();
  const email = data?.user?.email;
  const owner = await GetOwner(email as string);

  if (owner && (owner.user._id as string)) {
    console.log("Owner ID:", owner.user._id);
    const CarsData = await getCars(owner.user._id);

    if (!CarsData) {
      return (
        <div className="flex justify-between p-4 bg-slate-500">
          <h1 className="font-black text-2xl font-sans text-white">
            Your Cars
          </h1>
          <Button variant="contained" color="primary">
            <Link href={"/admin/addCar"}>Add Car</Link>
          </Button>
        </div>
      );
    }
    const cars = CarsData;
    console.log("Cars:", cars);
    // const cars = Cars;
    return (
      <>
        <div className="flex justify-between p-4 bg-slate-500">
          <h1 className="font-black text-2xl font-sans text-white">
            Your Cars
          </h1>
          <Button variant="contained" color="primary">
            <Link href={"/admin/addCar"}>Add Car</Link>
          </Button>
        </div>
        <div className="p-4 border border-gray-800">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b-2 border-black font-bold w-full p-2">
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car: Car) => (
                <tr key={car._id} className="border-b border-gray-200">
                  <td className="p-2"></td>
                  <td className="p-2 mx-2 font-bold uppercase text-2xl">
                    {car.title}
                  </td>
                  <td className="p-2 mx-2">{car.description}</td>
                  <td className="flex p-2 mx-2 items-center justify-center gap-3">
                    <Button variant="contained" color="secondary">
                      <Link href={`/admin/editCar/${car._id}`}>Edit Car</Link>
                    </Button>
                    <Remove id={car._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-between p-4 bg-slate-500">
      <h1 className="font-black text-2xl font-sans text-white">Your Cars</h1>
      <Button variant="contained" color="primary">
        <Link href={"/admin/addCar"}>Add Car</Link>
      </Button>
    </div>
  );
}
