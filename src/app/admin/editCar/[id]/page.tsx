import Link from "next/link";
import EditCarForm from "./EditCar";

const getCarByID = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/cars/${id}`);

    console.log("Response:", res);
    if (res.ok) {
      const car = await res.json();
      console.log(car);
      return car;
    }
  } catch (err) {
    console.log("Erreur trouver:", err);
    return;
  }
};

export default async function EditCar({ params }: { params: { id: string } }) {
  const { id } = params;

  console.log("L'ID de la modification est:",id);
  const car = await getCarByID(id);
  if (!car) throw new Error("Car is null");

  const { title, price, model, brand, description, city } = car;

  return (
    <div className="w-screen h-screen flex flex-col gap-4 p-5 justify-center items-center">
      <Link
        href={"/admin/listCar"}
        className="p-1.5 bg-green-700 border border-green-400 text-white hover:bg-green-200 rounded-md"
      >
        Return
      </Link>
      <EditCarForm
        title={title}
        price={price}
        model={model}
        brand={brand}
        description={description}
        city={city}
        id={id}
      />
    </div>
  );
}
