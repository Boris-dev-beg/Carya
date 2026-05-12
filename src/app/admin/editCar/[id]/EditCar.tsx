"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditCarFormProps {
  title: string;
  price: number;
  model: string;
  brand: string;
  description: string;
  city: string;
  id: string;
}

export default function EditCarForm({
  title,
  price,
  model,
  brand,
  description,
  city,
  id,
}: EditCarFormProps) {
  const [formData, setFormData] = useState({
    title: title,
    price: price,
    model: model,
    brand: brand,
    description: description,
    city: city,
  });
  const router = useRouter();

  const handlerSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        router.push("/admin/listCar");
      } else {
        throw new Error("Failed to update the car");
      }
    } catch (error) {
      console.log("Erreur de modification de la voiture:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-3 justify-center p-5 w-1/2 border border-gray-300 bg-slate-500 rounded-md"
      onSubmit={handlerSubmit}
    >
      <input
        onChange={(e) =>
          setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          })
        }
        value={formData.title}
        name="title"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="title"
      />
      <input
        onChange={(e) =>
          setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          })
        }
        value={formData.price}
        name="price"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="number"
        placeholder="price"
      />
      <input
        onChange={(e) =>
          setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          })
        }
        value={formData.model}
        name="model"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="model"
      />
      <input
        onChange={(e) =>
          setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          })
        }
        value={formData.brand}
        name="brand"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="brand"
      />
      <input
        onChange={(e) =>
          setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          })
        }
        value={formData.description}
        name="description"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="description"
      />
      <input
        onChange={(e) =>
          setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          })
        }
        value={formData.city}
        name="city"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="city"
      />
      <div>
        <Button variant="contained" color="primary" type="submit" className="rounded-md ">
          Edit
        </Button>
      </div>
    </form>
  );
}
