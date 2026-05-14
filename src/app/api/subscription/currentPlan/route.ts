import Mongoose_connection from "@/src/lib/mongoDB";
import { subscriptionModel } from "@/src/models/Subscription";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// ! Recuperation du plan selectionner de l'utilisateur connecté a partir de son id
export async function POST(req: NextRequest) {
  const UserId = await req.json(); // ? Recuperation de l'id de l'utilisateur

  try {
    await Mongoose_connection();

    const Plan = await subscriptionModel.findOne({ userId: UserId }); // ? Recuperation du plan de l'utilisateur connecté a partir de son id

    if (!Plan) {
      // ? Si aucun plan n'est trouvé pour l'utilisateur connecté, retourner une réponse indiquant que le plan n'a pas été trouvé
      return NextResponse.json(
        {
          message: "Plan not found",
        },
        { status: 404 },
      );
    }

    // ? Si un plan est trouvé pour l'utilisateur connecté, retourner le plan dans la réponse
    return NextResponse.json(
      {
        Plan,
      },
      { status: 200 },
    );
  } catch (err) {
    // ? En cas d'erreur lors de la récupération du plan de l'utilisateur connecté, retourner une réponse d'erreur
    console.log("Error:", err);
    return NextResponse.json(
      {
        Error: err,
      },
      { status: 500 },
    );
  }
}
