import Mongoose_connection from "@/src/lib/mongoDB";
import { UploadImage } from "@/src/lib/upload-image";
import { carModel } from "@/src/models/Car";
import { NextRequest, NextResponse } from "next/server";

type UploadResult = {
  secure_url: string;
  public_id: string;
};

type Photo = {
  image_url: string;
  public_id: string;
};
// ! Creation d'une voiture
export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("photos[]") as File[]; // ? Recuperatin de la cle contenant les images

  await Mongoose_connection();

  try {
    // ? Recuperatin de tous les images 
    const uploadResults: UploadResult[] = await Promise.all(
      files.map((file) => UploadImage(file, "image-folder")),
    );

    // ? Preparation du tableau d'image a inserer dans la base de donnee
    const photosToInsert: Photo[] = uploadResults.map((result) => ({
      image_url: result.secure_url,
      public_id: result.public_id,
    }));

    // ? Creation de la voiture
    const car = await carModel.create({
      title: formData.get("title"),
      photos: photosToInsert,
      brand: formData.get("brand"),
      model: formData.get("model"),
      mileage: Number(formData.get("mileage")),
      year: Number(formData.get("year")),
      fuel: formData.get("fuel"),
      transmission: formData.get("transmission"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      state: formData.get("state"),
      ownerId: formData.get("ownerId"),
    });
    console.log("Car Created :", car);
  } catch (err) {
    console.log("Erreur de creation du modele CAR:", err);
    return NextResponse.json(
      { message: "Erreur lors de la création de la voiture" },
      { status: 500 },
    );
  }
  return NextResponse.json(
    { message: "Your car has been added" },
    { status: 201 },
  );
}

// ! Recuperation de toutes les voitures
export async function GET() {
  await Mongoose_connection();
  const cars = await carModel.find({});

  return NextResponse.json(
    {
      cars,
    },
    {
      status: 200,
    },
  );
}

// ! Suppression d'une voiture
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await Mongoose_connection();
  await carModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Car deleted" }, { status: 200 });
}
