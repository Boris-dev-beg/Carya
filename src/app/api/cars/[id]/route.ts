import Mongoose_connection from "@/src/lib/mongoDB";
import { carModel } from "@/src/models/Car";
import { NextResponse, NextRequest } from "next/server";

export const runtime = "nodejs";

// ! Modification d'une voiture
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const formData = await request.json();

  await Mongoose_connection();
  const updatedCar = await carModel.findByIdAndUpdate(id, formData, {
    new: true,
  });

  if (!updatedCar) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(updatedCar, { status: 200 });
}

// ! Recuperation d'une seule voiture
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }, // ? Le context.params contient les parametres de l'URL, ici on va recuperer l'ID de la voiture a partir de l'URL
) {
  const { id } = await context.params; // ? Recuperation de l'ID de la voiture a partir de l'URL

  await Mongoose_connection(); // ? Connection a la base de donnee
  const car = await carModel.findById(id); // ? Recuperation de la voiture a partir de son ID

  if (!car) {
    console.log("Car not found");
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  console.log("Car found:", car);
  return NextResponse.json(car, { status: 200 });
}
