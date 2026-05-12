"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter()

  route.push("/v1/Accueil")
  return (
    <div className="p-40">
      <Button variant="outlined" color="primary">
        <Link href={"/admin"}>Profile</Link>
      </Button>
      <h1 className="text-3xl h-full w-full bg-black text-white font-sans">
        CARYA HOME-PAGE
      </h1>
      <Button variant="contained" color="secondary">
        <Link href={"/auth/login"}>login</Link>
      </Button>
      <Button variant="contained" color="secondary">
        <Link href={"/auth/registration"}>registration</Link>
      </Button>
    </div>
  );
}
