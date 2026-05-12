"use client";
import { ButtonSubmit } from "@/src/components/Buttons";
import { InputEntry } from "@/src/components/inputField";
import { Eye, EyeClosed, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {signIn, useSession} from 'next-auth/react'


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const route = useRouter();
  const {data: session} = useSession()
  if(session){
    console.log(session?.user)
  }

  // ! Functions / Comportements
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email, password, redirect: false
      })

      if (res?.error){
        setError("Invalid credentials")
      }

      // const response = await fetch("localhost://3000/api/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok)
      //   throw new Error("Impossible de trouve l'utilisateur pour l'instant :(");

      route.push("/admin");
    } catch (error) {
      console.log("Erreur rencontrée :", error);
    }
  };
  // ! Render
  return (
    <div className="w-2/5 h-2/3">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 border border-amber-100 rounded-2xl p-5"
      >
        <div className="m-3 p-3">
          <h2 className="text-3xl font-bold">Log In</h2>
          <p className="">Please make sure to complete all the field</p>
          {error && (
            <span className="text-white bg-red-400 w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </span>
          )}
        </div>
        {/* Entries */}
        <div className="flex flex-col gap-3">
          <InputEntry
            label="Email"
            value={email}
            onChange={(e: string) => setEmail(e)}
            placeholder="email@example.com"
            icon={Mail}
            type="email"
          />
          <InputEntry
            label="Password"
            value={password}
            onChange={(e: string) => setPassword(e)}
            placeholder="password123example"
            icon={Eye}
            icon2={EyeClosed}
            type="text"
          />
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-3 p-3">
          <ButtonSubmit name="Log In" />
        </div>
        <div className="flex items-center justify-center gap-3 px-20">
          <span className="h-0.5 w-full bg-black rounded-3xl"></span>
          <h1 className="">OR</h1>
          <span className="h-0.5 w-full bg-black rounded-3xl"></span>
        </div>
        <div className="flex items-center justify-center gap-3 p-3">
          <ButtonSubmit name="Continue with GitHub" icon="GitHub" onClick={() => signIn('github')} />
          <ButtonSubmit name="Continue with Google" icon="Google" />
        </div>
      </form>
      <div className="flex flex-col justify-center items-center p-3">
        <Link
          href={"/auth/registration"}
          className="text-white hover:underline w-full items-center justify-center flex"
        >
          Didn&apos;t have an account yet ?{" "}
          <p className="text-blue-700"> Register</p>
        </Link>
      </div>
    </div>
  );
}
