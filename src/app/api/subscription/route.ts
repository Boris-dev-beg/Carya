/**
 * ! Routes pour creer et afficher les Plans de souscription au vendeur
 */

import Mongoose_connection from "@/src/lib/mongoDB";
import { SubscriptionPlan } from "@/src/models/Subscription";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ! Enregistrement d'un plan par l'admin
export async function POST(req: Request) {
  // ? Recuperation des donnees depuis le front-end
  const { name, price, duration, benefits } = await req.json();

  try {
    await Mongoose_connection(); // ? Connection a mongoDB
     // ? Création du plan
    const plan = await SubscriptionPlan.create({ name, price, duration, benefits });

    return NextResponse.json(
      { message: "Plan de souscription créé avec succès", plan }, // ? Message de success
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { erreur: error }, // ? Message d'erreur
      { status: 500 }
    );
  }
}

// ! Recuperation de tous les plans pour les affichers au vendeurs
export async function GET() {
  try {
    await Mongoose_connection(); // ? Connection a MongoDB

    // ? Recuperation des plans
    const Plans = await SubscriptionPlan.find();

    return NextResponse.json(
      {
        Plans, // ? Envoie d'un objet du type (plans{Plans{...}})
      },
      { status: 200 },
    );
  } catch (error) {
    
    return NextResponse.json(
      {
        error: error, // ? Envoie d'un message d'erreur
      },
      { status: 500 },
    );
  }
}
