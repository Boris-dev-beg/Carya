import Mongoose_connection from "@/src/lib/mongoDB";
import { carModel } from "@/src/models/Car";
import { NextResponse, NextRequest } from "next/server";

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
) {
  const { id } = await context.params;
  await Mongoose_connection();
  const car = await carModel.findById(id);

  if (!car) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(car, { status: 200 });
}
