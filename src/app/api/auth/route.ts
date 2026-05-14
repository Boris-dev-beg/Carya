/**
 * ! Route non utiliser
 */
import Mongoose_connection from "@/src/lib/mongoDB";
import { userModel } from "@/src/models/User";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ! Creation d'un utilisateur
export async function POST(req: Request) {
  const { name, email, phone, password, role } = await req.json();
  await Mongoose_connection();

  try {
    await userModel.create({
      name,
      email,
      phone,
      password,
      role,
    });
  } catch (error) {
    console.log("Failed to create the User :", error);
  }

  return NextResponse.json(
    {
      message: "The new user has been created successfully",
    },
    { status: 201 },
  );
}

// ! Recuperation de tout les utilisateurs
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
