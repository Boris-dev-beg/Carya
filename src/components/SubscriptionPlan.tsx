"use client";
import { LucideIcon } from "lucide-react";
import { ObjectId } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PlansProps {
  planId: ObjectId;
  icon: LucideIcon;
  titre: string;
  prix: number;
  children: React.ReactNode;
  duration: number;
}

const getUser = async (email: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/getUser", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok)
      throw new Error("Impossible de selectionner l'utilisateur");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("An error occured:", error);
    return;
  }
};

export function SubscriptionPlans({
  icon: Icon,
  titre,
  prix,
  children,
  planId,
  duration,
}: PlansProps) {
  // ! Etats / States
  const { data } = useSession();
  const email = data?.user?.email;
  const route = useRouter()

  // ! Comportements / Functions
  const handleSelect = async (planId: ObjectId) => {
    const data = await getUser(email as string);
    const userId = data?.user?._id;
    console.log("The selected plan is:", planId, userId, duration);

    try {
      const response = await fetch(
        "http://localhost:3000/api/subscription/subscribed",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ planId, userId, duration }),
        },
      );

      if (!response.ok)
        throw new Error(
          "An error occured when we was trying to create your subscription plan",
        );

      const data = await response.json();
      alert(
        "Your subscription plan has been successfully created, thank you for your trust",
      );
      console.log("Donnees de la reponse:", data);
      route.push("/Dashboard");
    } catch (err) {
      console.log("Error:", err);
      return;
    }
  };

  // ! Affichages / Rendus
  return (
    <div
      className={`${titre === "PRO" && "scale-105"} relative rounded-md min-h-130 bg-white hover:scale-105 flex flex-col w-full shadow-md shadow-gray-300`}
    >
      {titre === "PRO" && (
        <h1 className="absolute bottom-full bg-amber-300 text-black rounded-md py-2 px-4 text-center">
          LE PLUS POPULAIRE
        </h1>
      )}
      <span
        className={`${titre === "PREMIUM" ? "bg-amber-600" : titre === "PRO" ? " bg-emerald-800" : "bg-gray-300"} rounded-t-md w-full flex items-center justify-center gap-2 py-4 text-white font-sans`}
      >
        <Icon className="size-13" />{" "}
        <h1 className="text-2xl font-bold">{titre}</h1>
      </span>
      <span
        className={`${titre === "PREMIUM" ? "text-amber-600" : titre == "PRO" ? "text-emerald-900" : "text-black"} bg-white w-full py-4 flex items-baseline justify-center border-b border-gray-300`}
      >
        <h1 className="flex items-center text-xl">
          <b className="text-5xl font-bold">{prix}</b>Fcfa
        </h1>
        <h1 className="font-bold">/mois</h1>
      </span>
      <span className="flex-1 flex flex-col items-start justify-start w-full text-xl px-3">
        {children}
      </span>
      <span className="rounded-md w-full flex items-center justify-center p-3">
        <button
          onClick={() => handleSelect(planId)}
          className={`${titre === "PREMIUM" ? "bg-amber-600 text-white" : titre === "PRO" ? "bg-emerald-800 text-white" : "border-2 border-emerald-800 text-emerald-800"} py-2 px-3 rounded-md font-bold`}
        >
          Choisir {titre}
        </button>
      </span>
    </div>
  );
}
