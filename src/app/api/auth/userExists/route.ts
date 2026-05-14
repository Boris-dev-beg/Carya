import Mongoose_connection from "@/src/lib/mongoDB";
import { userModel } from "@/src/models/User";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await Mongoose_connection();

    const { email } = await req.json();
    const user = await userModel.findOne({ email }).select("_id");
    console.log("User :", user);

    if(user !== null) return NextResponse.json({ user }, { status: 201 });

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    console.log(
      "Erreur de verification de l'existence de l'utilisateur :",
      error,
    );
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
