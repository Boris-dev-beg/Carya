"use client";

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react" 

export default function LogOutButton() {
    const handleClick = () =>{
        const confirmed = confirm("Etes vous sure de vouloire vous deconnecter ? ")

        if (confirmed) signOut({ callbackUrl: "/auth/login" })
    }
  return (
    
        <button
          onClick={handleClick}
          className="hover:bg-red-500 flex bg-red-400 text-white w-fit p-4 rounded-2xl shadow-md gap-5 items-center justify-center"
        >
          <LogOut size={20} /> <h1 className="sm:hidden lg:flex">Se déconnecter</h1>
        </button>
  )
}
