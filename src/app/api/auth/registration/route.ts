/**
 * ! Creation et selection des utilisateurs
 */

import Mongoose_connection from "@/src/lib/mongoDB";
import { userModel } from "@/src/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// ! Fonction de creation
export async function POST(req: Request) {
  const { name, email, phone, password, role } = await req.json();
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await Mongoose_connection();
    await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    return NextResponse.json(
    {
      message: "The new user has been created successfully",
    },
    { status: 201 },
  );
  } catch (error) {
    console.log("Erreur de creation de l'utilisateur :", error);
    return NextResponse.json(
    {
      "Error": error,
    },
    { status: 500 },
  );
  }
}

// ! Fonction de selection
export async function GET() {
  await Mongoose_connection();

  const users = await userModel.find({});
  return NextResponse.json(
    {
      users,
    },
    { status: 201 },
  );
}
