"use client";
import { Role } from "@/src/components/ButtonRole";
import { InputForm } from "@/src/components/InputForm";
import Loading from "@/src/components/load/loading";
import {
  BriefcaseBusiness,
  IdCardLanyard,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  // ! Etats
  const [loading, setLoading] = useState<boolean>(false)
  const [role, setRole] = useState("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string>("");
  const route = useRouter();

  // ! Comportements
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true)

    if ( // ? Verification de la validitee des champs
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === ""
    ) {
      setError("Please fill the form correctly");
      return;
    }

    try {
      // ? Recuperation de la reponse de verification de l'existance prealable de l'utilisateur
      const response_UserExist = await fetch(
        "/api/auth/userExists",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (response_UserExist.ok) { // ? S'il existe, il est renvoyer vers la pge de login
        alert("User Already Exist");
        route.push("/auth/login");
        return
      }

      // ? Reponse de creation de l'utilisateur s'il n'existe pas
      const response_CreateUser = await fetch(
        "/api/auth/registration",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name, email, phone, password, role }),
        },
      );

      if (!response_CreateUser.ok) { // ? Si la creation n'a pas reussi
        alert("An error occurred");
        setLoading(false)
        return;
      }
      console.log(response_CreateUser);
    setLoading(false)
      route.push("/auth/login"); // ? Renvoi vers la page de Login si la creation a reussi
    } catch (error) {
      console.log("Erreur :", error);
      setLoading(false)
    }

    // ? Reset de tout les champs;
    setLoading(false)
    setError("");
    setRole("buyer");
    setEmail("");
    setName("");
    setPassword("");
    setPhone("");
  };

  // ! Return / Rendu
  if(loading){ return <Loading />}
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-3 py-2 items-center text-white mb-12 gap-4"
    >
      <span className="flex flex-col items-center justify-center">
        <h2 className="text-4xl border-b border-white py-1 font-bold text-center w-full text-white ">
          Inscription
        </h2>
        <p className="text-center pt-2">Creez votre compte en tant que</p>
        <p className="w-full text-center font-bold border border-emerald-400 text-emerald-400 py-1">
          {role ==="seller" ? "Vendeur":"Acheteur"}
        </p>
        <span className="w-full flex gap-2 items-center justify-center">
          <Role
            icon={BriefcaseBusiness}
            name="Acheteur"
            onClick={(e) => setRole(e)}
            selected={role === "buyer"}
          />
          <Role
            icon={IdCardLanyard}
            name="Vendeur"
            onClick={(e) => setRole(e)}
            selected={role === "seller"}
          />
        </span>
      </span>
      <span className="flex flex-col gap-3 w-full px-4">
        <InputForm
          type="text"
          icon={User}
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e)}
        />
        <InputForm
          type="email"
          icon={Mail}
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e)}
        />
        <InputForm
          type="password"
          icon={LockKeyhole}
          placeholder="Creer un mot de passe"
          value={password}
          onChange={(e) => setPassword(e)}
        />
        <InputForm
          type="text"
          icon={Phone}
          placeholder="Numero de telephone"
          value={phone}
          onChange={(e) => setPhone(e)}
        />

        <div className="w-full px-2">
          <p>En creant un compte, vous acceptez nos</p>
          <p className="text-emerald-700 hover:text-emerald-500 cursor-pointer underline text-[14px]">
            Condition d&apos;utilisation et notre Politique de confidentialite.
          </p>
          {error && (
            <p className="w-full bg-red-500 text-white px-1 mt-2 text-start">
              {error}
            </p>
          )}
        </div>
      </span>

      <span className="flex flex-col gap-2 w-full">
        <button
          type="submit"
          className="mx-13 my-3 hover:bg-emerald-800 bg-emerald-700 font-bold text-center text-xl py-2 rounded-md"
        >
          S&apos;inscrire
        </button>
      </span>
      <span className="w-full flex flex-col gap-2 items-center justify-center">
        <p>Vous avez deja un compte ?</p>
        <Link
          href="/auth/login"
          className="hover:font-bold border-b border-white"
        >
          connectez-vous
        </Link>
      </span>
    </form>
  );
}
