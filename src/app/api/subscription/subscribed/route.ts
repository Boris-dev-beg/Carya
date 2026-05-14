import Mongoose_connection from "@/src/lib/mongoDB";
import { subscriptionModel } from "@/src/models/Subscription";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { planId, userId, duration } = await req.json();
  const status = "active";
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + duration);

  try {
    await Mongoose_connection();
    const plan = await subscriptionModel.create({
      planId,
      userId,
      status,
      startDate,
      endDate,
    });

    return NextResponse.json(
      { message: `Your plan have been succesfull created : ${plan}` },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error in the server", err);
    return NextResponse.json(
      {
        error: `An error occured : ${err}`,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await Mongoose_connection();

    const Plan = await subscriptionModel.findOne({},"planId");
    return NextResponse.json(
      {
        Plan,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error:", err);
    return NextResponse.json(
      {
        Error: err,
      },
      { status: 500 },
    );
  }
}
