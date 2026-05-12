"use client"
import { LucideIcon } from "lucide-react";

interface PropsInput {
  icon: LucideIcon;
  name: string;
  selected: boolean
  onClick: (e: string) => void
}

export function Role({
  icon: Icon,
  name,
  selected
  , onClick
}: PropsInput) {
  return (
    <button type="button" onClick={()=>onClick(name === "Acheteur" ? "buyer" : "seller")} className={`${selected ? "bg-emerald-700 text-white": "backdrop-blur-lg text-white"} flex gap-2 text-center py-2 px-6 rounded-md transition-all duration-300`}>
      <Icon /> {name}
    </button>
  );
}
