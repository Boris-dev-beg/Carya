import Mongoose_connection from "@/src/lib/mongoDB";
import { userModel } from "@/src/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log("Body reçu:", email, password);

  try {
    await Mongoose_connection();

    // ? Recherche de l'utilisateur par email uniquement
    const user = await userModel.findOne({ email });
    console.log("user trouver:", user);

    // ? Comparation du mot de passe fourni avec le hash stocké
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      console.log("Résultat comparaison:", isValid);
      if (!isValid) throw new Error("Mot de passe incorrect");
    }else{
      throw new Error("User is null")
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `Erreur de récupération de l'utilisateur: ${err}` },
      { status: 500 },
    );
  }
}
