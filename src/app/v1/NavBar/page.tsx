"use client";
import NavLink from "@/src/components/NavLink";
import {
  CarFront,
  Home,
  LogIn,
  Menu,
  MessageCircleMore,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GetUser } from "@/src/lib/GetUser";
import LogOutButton from "@/src/components/LogOutButton";

export default function NavBar() {
  // ! Etats / States
  const { data } = useSession();
  const email = data?.user?.email as string;
  const [activeNav, setActiveNav] = useState(false);
  const [role, setRole] = useState("buyer");
  const pathName = usePathname();

  // ! Comportements / Functions
  useEffect(() => {
    return () => setActiveNav(false);
  }, [pathName]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!email) return;
      const data = await GetUser(email);
      if (data?.user) {
        setRole(data.user.role);
      }
    };
    fetchUser();
  }, [email]);
  return (
    <header className="z-40 sticky top-0 flex justify-between gap-5 items-center w-full h-20! p-3 bg-emerald-800 shadow-xs shadow-emerald-300 overflow-hidden">
      <span className="relative w-2/3 h-85 md:size-95">
        <Image
          src={"/logo_1.png"}
          alt="Logo"
          className="rounded-full"
          fill
          sizes="(max-widht: 640px) 30vw"
        />
      </span>
      <button
        onClick={() => setActiveNav(!activeNav)}
        className="md:hidden text-white hover:bg-emerald-700 p-2 rounded-full "
      >
        <Menu />
      </button>
      <nav className="md:flex items-center justify-center gap-3 hidden w-155 text-white">
        {[
          { href: "/v1/Accueil", label: "Accueil", icon: Home },
          { href: "/v1/Annonces", label: "Nos Annonces", icon: CarFront },
          {
            href: "/v1/Chat",
            label: "Message",
            icon: MessageCircleMore,
            role: role,
          },
          {
            href: "/v1/Profil",
            label: "Mon Profil",
            icon: UserRound,
            role: role,
          },
        ].map((link, index) => (
          <NavLink
            key={index}
            label={link.label}
            href={link.href}
            icon={link.icon}
            role={link.role}
          />
        ))}
      </nav>
      {/* Responsive Nav-Bar */}
      <div
        className={`${activeNav ? "translate-x-0" : "-translate-x-full"} transform transition-transform duration-300 ease-in-out md:hidden fixed left-0 top-0 z-20 backdrop-blur-md w-full`}
      >
        <div className="relative w-[85vw] min-h-screen h-screen bg-emerald-800 text-white flex flex-col">
          <span className="flex justify-between items-center p-3 border-b border-b-emerald-500 overflow-hidden h-20 w-full">
            <span className="relative w-55 h-55">
              <Image
                src={"/logo_2.png"}
                alt="Logo"
                className="rounded-full"
                fill
                sizes="(max-widht: 640px) 10vw object-cover"
              />
            </span>
            <button
              onClick={() => setActiveNav(!activeNav)}
              className="text-white hover:bg-emerald-700 p-2 rounded-full"
            >
              <X />
            </button>
          </span>
          <ResponsiveNavBar email={email} role={role} />
        </div>
      </div>
      {/* Responsive Nav-Bar */}
      {!data ? (
        <div className="hidden sm:flex text-white ">
          <Link
            href="/auth/login"
            className="shadow-md shadow-green-700 rounded-md p-3 text-white bg-emerald-800 hover:bg-emerald-700 hover:shadow-emerald-600 transition-colors duration-300"
          >
            Se connecter
          </Link>
        </div>
      ): (
        <LogOutButton />
      )}
    </header>
  );
}

function ResponsiveNavBar({ email, role }: { email: string; role: string }) {
  return (
    <div className="flex-1 flex flex-col w-full items-start px-2">
      <nav className="flex flex-col items-start justify-center border-b border-emerald-400 gap-3 p-4 w-2/4 text-white">
        {[
          { href: "/v1/Accueil", label: "Accueil", icon: Home },
          { href: "/v1/Annonces", label: "Nos Annonces", icon: CarFront },
          {
            href: "/v1/Chat",
            label: "Message",
            icon: MessageCircleMore,
            role: role,
          },
          {
            href: "/v1/Profil",
            label: "Mon Profil",
            icon: UserRound,
            role: role,
          },
        ].map((link, index) => (
          <NavLink
            key={index}
            label={link.label}
            href={link.href}
            icon={link.icon}
            isResponsive
            role={link.role}
          />
        ))}
      </nav>
      {!email ? (
        <div className="flex flex-col items-center justify-center text-white gap-5 py-5">
          <span className="flex flex-col gap-2.5">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 shadow-md shadow-green-700 rounded-md p-3 text-white bg-emerald-800 hover:bg-emerald-700 hover:shadow-emerald-600 transition-colors duration-300"
            >
              <LogIn /> Se connecter
            </Link>
          </span>
        </div>
      ): (<LogOutButton />)}
      <span className="flex-1 w-full flex flex-col text-center justify-end p-3 gap-2">
        <p>&copy; 2026 CARYA</p>
        <p>Tous droits reserves</p>
      </span>
    </div>
  );
}
