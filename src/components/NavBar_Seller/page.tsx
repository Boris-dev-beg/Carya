"use client";
import {
  ArrowBigLeftDash,
  ChartArea,
  ClipboardList,
  ClipboardPlus,
  LogOut,
  Menu,
  MessageCircleMore,
  Star,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavLink from "../NavLink";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  // ! Declaration des etats
  const [show_Responsive_navbar, setShow_Responsive_navbar] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    return () => setShow_Responsive_navbar(false);
  }, [pathName]);
  return (
    <>
      <Link
        href="/v1/Accueil"
        className="hover:bg-emerald-800 hover:text-white p-2 rounded-md flex items-center justify-center transition-all duration-300"
      >
        <ArrowBigLeftDash />
      </Link>
      <span className="relative h-70 w-full md:w-2/4 lg:w-1/3 mt-5">
        <Image
          src="/logo1.png"
          alt="/logo1.png"
          fill
          loading="eager"
          sizes="(max-width: 640px) 80vw"
          className="object-center"
        />
      </span>
      {/* Nav Links */}
      <nav className="hidden md:flex items-start justify-center border-b border-emerald-400 gap-3 p-4">
        {[
          { href: "/Dashboard", label: "Tableau de bord", icon: ChartArea },
          {
            href: "/Dashboard/Announcements",
            label: "Mes Annonces",
            icon: ClipboardList,
          },
          {
            href: "/Dashboard/Chat",
            label: "Mes Message",
            icon: MessageCircleMore,
          },
          { href: "/Dashboard/Profil", label: "Mon Profil", icon: UserRound },
        ].map((link, index) => (
          <NavLink
            key={index}
            label={link.label}
            href={link.href}
            icon={link.icon}
          />
        ))}
      </nav>
      <Link
        href="/Dashboard/Subscription"
        className="flex items-center justify-center gap-2 rounded-md py-3 px-5 text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
      >
        <Star fill="orange" />
      </Link>
      {/* Nav Links */}
      <Link
        href="/Dashboard/Add_Announcement"
        className="hidden md:flex items-center justify-center gap-2 shadow-md shadow-green-700 rounded-md py-3 px-5 text-white bg-emerald-800 hover:bg-emerald-700 hover:shadow-emerald-600 transition-colors duration-300"
      >
        <ClipboardPlus /> <p className="hidden lg:block">Deposer une annonce</p>
      </Link>
      <button
        className="hover:bg-emerald-800 hover:text-white p-2 rounded-md md:hidden flex items-center justify-center transition-all duration-300"
        onClick={() => setShow_Responsive_navbar(!show_Responsive_navbar)}
      >
        <Menu />
      </button>
      {/* Responsive NavBar */}
      {show_Responsive_navbar && (
        <div
          className={`${show_Responsive_navbar ? "translate-x-0" : "-translate-x-full"} transform transition-transform ease-in-out duration-300 md:hidden fixed left-0 top-0 z-20 backdrop-blur-md w-full`}
        >
          <div className="relative w-[85vw] min-h-screen h-screen text-emerald-800 bg-white flex flex-col shadow-lg shadow-gray-100 border-r border-gray-100">
            <span className="flex justify-between items-center p-3 border-b border-b-emerald-500 overflow-hidden h-20 w-full">
              <span className="relative w-45 h-45">
                <Image
                  src={"/Logo_Vert_Sans_Text.png"}
                  alt="Logo"
                  className="rounded-full object-cover"
                  fill
                  sizes="(max-widht: 640px) 80vw"
                />
              </span>

              <Link
                href="/Dashboard/Subscription"
                className="flex items-center justify-center gap-2 rounded-md py-3 px-5 text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
              >
                <Star fill="orange" />
              </Link>
              <button
                onClick={() =>
                  setShow_Responsive_navbar(!show_Responsive_navbar)
                }
                className="hover:text-white hover:bg-emerald-700 transition-colors duration-300 p-2 rounded-full"
              >
                <X />
              </button>
            </span>
            <ResponsiveNavBar />
          </div>
        </div>
      )}
      {/* Responsive NavBar */}
    </>
  );
}

function ResponsiveNavBar() {
  return (
    <div className="flex-1 flex flex-col w-full items-start px-2">
      <nav className="flex flex-col items-start justify-center border-b border-emerald-400 gap-3 p-4 w-3/4 bg-white">
        {[
          { href: "/Dashboard", label: "Tableau de bord", icon: ChartArea },
          {
            href: "/Dashboard/Announcements",
            label: "Mes Annonces",
            icon: ClipboardList,
          },
          {
            href: "/Dashboard/Chat",
            label: "Mes Message",
            icon: MessageCircleMore,
          },
          { href: "/Dashboard/Profil", label: "Mon Profil", icon: UserRound },
        ].map((link, index) => (
          <NavLink
            key={index}
            label={link.label}
            href={link.href}
            icon={link.icon}
            isResponsive
          />
        ))}
      </nav>
      <div className="flex flex-col text-white gap-5 py-5">
        <Link
          href="/Dashboard/Add_Announcement"
          className="flex items-center justify-center gap-2 shadow-md shadow-green-700 rounded-md py-3 px-5 text-white bg-emerald-800 hover:bg-emerald-700 hover:shadow-emerald-600 transition-colors duration-300"
        >
          <ClipboardPlus /> Deposer une annonce
        </Link>
        <button className="flex items-center justify-center gap-2 shadow-md shadow-red-300 rounded-md p-3 text-white bg-red-800 hover:bg-red-600 hover:shadow-red-400 transition-colors duration-300">
          <LogOut /> Se Deconnecter
        </button>
      </div>
      <span className="flex-1 w-full flex flex-col text-center justify-end p-3 gap-2">
        <p>&copy; 2026 CARYA</p>
        <p>Tous droits reserves</p>
      </span>
    </div>
  );
}
