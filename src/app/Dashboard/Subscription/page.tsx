"use client";
import { SubscriptionPlans } from "@/src/components/SubscriptionPlan";
import { Car, Crown, Star } from "lucide-react";
import { ObjectId } from "mongoose";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/load/loading";
import {GetUser} from "@/src/lib/GetUser";

// ? Recuperation des plans
const fecthPlans = async () => {
  try {
    // ? Recuperation de la reponse contenant les plans
    const response = await fetch("/api/subscription", {
      cache: "reload",
    });

    if (!response.ok) return [];

    // ? Recuperation des plans
    const data = await response.json();

    console.log("Plans Recus:", data);

    return data?.Plans;
  } catch (err) {
    console.log("An error occure while fetching plans:", err);
    return [];
  }
};

// ? Recuperation du plan selectionner
const fetchSelectedPlan = async () => {
  try {
    const response = await fetch("/api/subscription/subscribed");

    if (!response.ok) throw new Error("Failed to load your plan");

    const { Plan } = await response.json();

    return Plan;
  } catch (err) {
    console.log(`Error : ${err}`);
    return;
  }
};

export default function Subscription() {
  // ! States / Etats
  const [Plans, setPlans] = useState<
    {
      benefits: string[];
      duration: number;
      name: string;
      price: number;
      _id: ObjectId;
    }[]
  >([]);
  const [currentPlan, setCurrentPlan] = useState<{ planId: ObjectId }>();
  const route = useRouter();
  const [loading, setLoading] = useState(true);

  // ! Comportements / functions
  useEffect(() => {
    const getPlans = async () => {
      const fetchedPlans = await fecthPlans();
      setPlans(fetchedPlans); // ? Mise a jours du tableau de plans

      const currentPlan = await fetchSelectedPlan();
      setCurrentPlan(currentPlan);
      console.log("Your current plan is :", currentPlan);
    };
    getPlans();
  }, []);
  useEffect(() => {
    const testPlan = async () => {
      const data = await GetUser(email as string); // ? Recuperation de l'utilisateur connecté;
      const userId = data?.user?._id;
      
      if (!Plans || Plans.length === 0) return;

      const match = Plans.find(
        (plan) =>
          plan._id === currentPlan?.planId && currentPlan?.userId === userId,
      ); // ? Verification de l'existence d'un plan correspondant a l'id du plan de l'utilisateur connecté
      if (match) {
        route.push("/Dashboard");
      } else {
        setLoading(false);
      }
    };
    testPlan();
  }, [Plans, currentPlan, route]);

  if (loading) {
    return <Loading />;
  }
  // ! Rendu / Affichage
  return (
    <>
      {Plans.map((plan, i) => (
        <SubscriptionPlans
          key={i}
          icon={
            plan.name === "BASIC" ? Car : plan.name === "PRO" ? Star : Crown
          }
          titre={plan.name}
          prix={plan.price}
          planId={plan._id}
          duration={plan.duration}
        >
          {plan.benefits.map((b, i) => (
            <p
              key={i}
              className="font-bold py-4 border-b border-gray-300 w-full flex items-center gap-3"
            >
              <b
                className={`size-2 ${plan.name === "BASIC" ? "bg-black" : plan.name === "PRO" ? "bg-emerald-800" : "bg-amber-600"} rounded-full`}
              ></b>{" "}
              {b}
            </p>
          ))}
        </SubscriptionPlans>
      ))}
    </>
  );
}
