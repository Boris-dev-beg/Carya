"use client";
import type { Metadata } from "next";
import Footer from "./Footer/page";
import NavBar from "./NavBar/page";
import { Suspense, useEffect } from "react";
import Loading from "@/src/components/load/loading";
import { useRouter } from "next/navigation";

export const metaData: Metadata = {
    title: "Carya : Page d'accueil",
    description:"La page d'accueil de la v1 de cette application"
}

export default function Layout({ children }: Readonly<{children: React.ReactNode}>){
    const route = useRouter();
    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }, [route])
    return(
        <section className="bg-gray-200 flex flex-col min-w-full min-h-screen">
        <NavBar />
        <main className="flex-1 overflow-hidden min-h-screen flex flex-col items-center justify-center">
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <Footer />
        </section>
    )
}