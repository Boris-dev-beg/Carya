import NavBar from "@/src/components/NavBar_Seller/page"
import React from "react"

export default function DashboardLayout({children}: Readonly<{
    children: React.ReactNode
}>){
    return(
        <section>
            <NavBar />
            <main className="bg-gray-100">{children}</main>
        </section>
    )
}