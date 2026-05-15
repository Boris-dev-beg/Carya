"use client";

import { WhatsApp } from "@mui/icons-material";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ButtonContact({
  id,
  sellerPhone,
}: {
  id?: string;
  sellerPhone?: string;
}) {
  const [show, setShow] = useState(false);

  // ? Redirection vers WhatsApp
  const handleClick = () => {
    const url = `https://wa.me/237${sellerPhone}`;
    window.open(url, "_blank"); // ? ouverture de WhatsApp dans un nouvel onglet
  };
  return (
    <span className="w-full relative flex flex-col">
      <button
        onClick={() => setShow(!show)}
        className="bg-emerald-800 text-white py-2 hover:bg-emerald-700 shadow-xs shadow-emerald-900 rounded-md"
      >
        Contacter le Vendeur
      </button>
      {show && (
        <span className="rounded-md py-4 px-2 flex items-center justify-center gap-2 absolute top-full -left-0">
          <button
            onClick={handleClick}
            className="bg-emerald-600 text-white py-2 px-3 hover:bg-emerald-800 shadow-xs shadow-emerald-900 rounded-md flex gap-2 transition-colors duration-300"
          >
            <WhatsApp /> WhatsApp
          </button>
          <Link
            href={`/v1/Chat/${id}`}
            className="text-emerald-800 bg-white py-2 px-3 hover:bg-emerald-800 hover:text-white shadow-xs shadow-emerald-900 rounded-md flex gap-2 transition-colors duration-300"
          >
            <MessageCircle /> Message
          </Link>
        </span>
      )}
    </span>
  );
}
