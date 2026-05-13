"use client";
import { InputForm } from "@/src/components/InputForm";
import { Google, Facebook } from "@mui/icons-material";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function Loginpage() {
  // ! Etats / states
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const route = useRouter();
  const { data: session } = useSession();
  if (session) {
    console.log(session?.user);
  }

  // ! Functions / Comportements
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (password.trim() === "" || email.trim() === "") {
      // ? Verification de la validitee des champs
      setError("Please fill the form correctly");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials");
        console.log("Erreur:", res.error)
      }else  route.push("/v1/Accueil")

    } catch (error) {
      console.log("Erreur rencontrée :", error);
    }

    setEmail("");
    setPassword("");
    setError("");
  };

  // ! Affichages / Rendus
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-3 py-2 items-center text-white mb-12 gap-4"
    >
      <span className="flex flex-col items-center justify-center">
        <h2 className="text-4xl border-b border-white py-1 font-bold text-center w-full text-white ">
          Connexion
        </h2>
        <p className="text-center pt-2">Connectez-vous a votre compte</p>
      </span>
      <span className="flex flex-col gap-3 w-full px-8">
        <InputForm
          type="email"
          icon={Mail}
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e: string) => setEmail(e)}
        />
        <InputForm
          type="password"
          icon={LockKeyhole}
          placeholder="Creer un mot de passe"
          value={password}
          onChange={(e: string) => setPassword(e)}
        />
        <div className="w-full flex flex-col justify-end items-end px-2">
          <p className="border-b border-emerald-700">Mot de passe oublier?</p>
          {error && (
            <p className="w-full bg-red-500 text-white px-1 mt-2 text-start">
              {error}
            </p>
          )}
        </div>
      </span>
      <span className="flex flex-col gap-2 w-full">
        <button className="mx-13 my-3 bg-emerald-700 hover:bg-emerald-800 font-bold text-center text-xl py-2 rounded-md">
          Se Connecter
        </button>
        <h1 className="mx-2 py-2 w-full border-y border-white/50 text-center">
          Ou connectez-vous avec
        </h1>
        <span className="w-full flex gap-2 items-center justify-center">
          <button className="bg-white text-black flex gap-2 text-center py-2 px-6 rounded-md">
            <Google /> Google
          </button>
          <button className="bg-blue-700 text-white flex gap-2 text-center py-2 px-6 rounded-md">
            <Facebook /> Facebook
          </button>
        </span>
      </span>
      <span className="w-full flex flex-col gap-2 items-center justify-center">
        <p>Pas encore de compte ?</p>
        <Link
          href="/auth/registration"
          className="hover:font-bold border-b border-white"
        >
          Inscrivez-vous
        </Link>
      </span>
    </form>
  );
}
