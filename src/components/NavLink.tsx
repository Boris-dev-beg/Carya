"use client";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  href: string;
  label: string;
  icon: LucideIcon;
  isResponsive?: boolean;
  role?: string;
}

export default function NavLink({
  href,
  label,
  icon: Icon,
  isResponsive,
  role,
}: Props) {
  const pathName = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleActive = () => {
      if (pathName === href) {
        setIsActive(true);
      } else setIsActive(false);
    };
    handleActive();
  }, [pathName, href]);
  
  const getHref = () => {
    if (role === "seller") {
      switch (label.trim().toLowerCase()) {
        case "message":
          return "/Dashboard/Chat";
        case "mon profil":
          return "/Dashboard/Profil";
        default:
          return href;
      }
    }
    return href;
  };

  const newHref = getHref() as string;
  return (
    <Link
      href={newHref}
      className={`${isActive ? "border-y-2 border-emerald-700" : "hover:bg-emerald-700 hover:text-white"} transition-colors duration-300 font-bold p-3 rounded-md gap-1 items-center justify-start w-auto ${role && !TabRole.includes(role as string) ? "hidden" : "flex"}`}
    >
      <Icon className="flex lg:hidden" />
      <p className={isResponsive ? "flex" : "lg:flex hidden"}>{label}</p>
    </Link>
  );
}

const TabRole = ["buyer", "seller"];
