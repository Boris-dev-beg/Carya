"use client";

import { useSession } from "next-auth/react";
import { InputEntry } from "@/src/components/inputField";
import { Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";

const getUser = async (email: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/getUser`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || "Can't find user : Fatale error");
    return data;
  } catch (err) {
    console.log("Error Finded:", err);
    return;
  }
};

interface User {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export default function UserInfo() {
  // ! States / Etats
  const { data } = useSession();
  const preventEmail = data?.user?.email as string;
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("seller");

  useEffect(() => {
    const fetchUser = async () => {
      if (!preventEmail) return;
      const data = await getUser(preventEmail);
      if (data?.user) {
        setName(data.user.name);
        setEmail(data.user.email);
        setPhone(data.user.phone);
        setRole(data.user.role);
      }
    };
    fetchUser();
  }, [preventEmail]);

  // ! Comportements / fonctions
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !role) {
      setError("All fields are necessary.");
      return;
    }
  };

  // ! Affichage / Rendu
  return (
    <div className="w-2/5 h-2/3">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 border border-amber-100 rounded-2xl p-5"
      >
        <div className="m-3 p-3">
          {error && (
            <span className="text-white bg-red-400 w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </span>
          )}
        </div>
        {/* Entries */}
        <div className="flex flex-col gap-3">
          <InputEntry
            label="Full Name"
            value={name}
            onChange={(e: string) => setName(e)}
            placeholder="John Doe"
            icon={User}
            type="text"
          />
          <InputEntry
            label="Email"
            value={email}
            onChange={(e: string) => setEmail(e)}
            placeholder="JohnDoe@example.com"
            icon={Mail}
            type="email"
          />
          <InputEntry
            label="Phone number"
            value={phone}
            onChange={(e: string) => setPhone(e)}
            placeholder="(+237) 6 12 34 56 78"
            icon={Phone}
            type="text"
          />
          <div className="relative border rounded-md p-3 my-3 bg-slate-100 text-black flex gap-2 justify-center items-center">
            <h1 className="absolute -top-5 left-1 uppercase font-black">
              Role
            </h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full outline-none"
            >
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-3 p-3">
          <button
            type="submit"
            className="rounded-xl p-2 text-center flex items-center justify-center gap-3 bg-amber-500/90 hover:bg-amber-600 text-white"
          >
            Save change
          </button>
        </div>
      </form>
    </div>
  );
}
