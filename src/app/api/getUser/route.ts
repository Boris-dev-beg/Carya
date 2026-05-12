import Mongoose_connection from "@/src/lib/mongoDB";
import { userModel } from "@/src/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await Mongoose_connection();

    const user = await userModel.findOne({ email: email });
    if (!user) throw new Error("Error find");
    return NextResponse.json(
      {
        user,
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: err,
      },
      { status: 500 },
    );
  }
}
