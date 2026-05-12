"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const GetOwner = async (email: string) => {
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

function AddCar() {
  // ? recuperation de la session de l'utilisateur
  const { data } = useSession();
  const email = data?.user?.email;

  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
    price: "",
    model: "",
    brand: "",
    description: "",
    city: "",
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    console.log("Element:", value )
  };
  async function handlerSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const owner = await GetOwner(email as string);
    const id = owner?.user?._id;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("model", formData.model);
    data.append("brand", formData.brand);
    data.append("description", formData.description);
    data.append("city", formData.city);
    data.append("id", id);

    if (formData.image) {
      data.append("image", formData.image);
    }
    try {
      const response = await fetch("http://localhost:3000/api/cars", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to create a car");
      }
      router.push("/admin/listCar");
    } catch (error) {
      console.log("Erreur de creation de la voiture:", error);
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 p-5 justify-center items-center">
      <Link
        href={"/admin/listCar"}
        className="p-1.5 bg-green-700 border border-green-400 text-white hover:bg-green-200 rounded-md"
      >
        Return
      </Link>
      <form
        className="flex flex-col gap-3 justify-center p-5 w-1/2 border border-gray-300 bg-slate-500 rounded-md"
        onSubmit={handlerSubmit}
      >
        <input
          onChange={handleChange}
          name="image"
          className="p-2 bg-slate-200 text-black outline-none rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
          type="file"
          accept="image/*"
          placeholder="Upload your Image"
        />
        <input
          onChange={handleChange}
          value={formData.title}
          name="title"
          className="p-2 bg-slate-200 text-black outline-none rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
          type="text"
          placeholder="Title"
        />
        <input
          onChange={handleChange}
          value={formData.price}
          name="price"
          className="p-2 bg-slate-200 text-black outline-none rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
          type="number"
          placeholder="Price"
        />
        <input
          onChange={handleChange}
          value={formData.model}
          name="model"
          className="p-2 bg-slate-200 text-black outline-none rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
          type="text"
          placeholder="Model"
        />
        <input
          onChange={handleChange}
          value={formData.brand}
          name="brand"
          className="p-2 bg-slate-200 text-black outline-none rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
          type="text"
          placeholder="Brand"
        />
        <textarea
          onChange={handleChange}
          value={formData.description}
          name="description"
          className="p-2 bg-slate-200 text-black outline-none rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
          placeholder="Description"
        />
        <input
          onChange={handleChange}
          value={formData.city}
          name="city"
          className="p-2 bg-slate-200 text-black outline-none rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
          type="text"
          placeholder="City"
        />
        <div>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCar;
