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
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
