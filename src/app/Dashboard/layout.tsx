"use client";
import NavBar from "@/src/components/NavBar_Seller/page";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const route = useRouter();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);
  return (
    <section>
      <header className="z-20 sticky top-0 flex items-center justify-between px-3 h-20 w-full overflow-hidden bg-white text-emerald-800 shadow-lg shadow-gray-300">
        <NavBar />
      </header>
      <main className="bg-gray-100">{children}</main>
    </section>
  );
}
