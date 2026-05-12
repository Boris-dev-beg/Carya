import type { Metadata } from "next";
import Footer from "./Footer/page";
import NavBar from "./NavBar/page";
import { Suspense } from "react";
import Loading from "@/src/components/load/loading";

export const metaData: Metadata = {
    title: "Carya : Page d'accueil",
    description:"La page d'accueil de la v1 de cette application"
}

export default function Layout({ children }: Readonly<{children: React.ReactNode}>){
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