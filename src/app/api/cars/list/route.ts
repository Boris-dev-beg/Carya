import Mongoose_connection from "@/src/lib/mongoDB";
import { carModel } from "@/src/models/Car";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

// ! Recuperation des voitures de l'utilisateur
export async function POST(req: NextRequest) {
  const { ownerId } = await req.json();
  const userID = new mongoose.Types.ObjectId(ownerId)
  try {
    await Mongoose_connection();
    const cars = await carModel.find({ ownerId: userID });
    console.log("Server Cars and id:", cars, ownerId);

    if (!cars)
      throw new Error("Cars not finded");

    return NextResponse.json(cars, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
