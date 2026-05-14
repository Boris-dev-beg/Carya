"use client"
import { Item } from "@/src/components/Chat_Item";
import { Search } from "lucide-react";
import { useState } from "react";

const TabChatList = [
  {
    id: "/v1/Chat/1",
    image: "man_1.jpg",
    vendeur: "Jean Dupont",
    voiture: "BMW Serie 3 2020",
    message: "Oui, samedi a 14h, cela me convient parfaitement",
    heure: "il y a 5 min",
    non_lue: 1,
  },
];

export default function Chat() {
  // ! States / Etats
  const [searchValue, setSearchValue] = useState("");

  // ! Comportements / Fonctions
   const newChatList = TabChatList.filter(chat =>
  searchValue === "" ||
  Object.values(chat).some(val =>
    String(val).toLowerCase().includes(searchValue.toLowerCase())
  )
   )

  // ! Affichage / Rendu
  return (
    <section className="flex-1 flex flex-col items-center justify-center w-full bg-white">
      <header className="flex flex-col p-3 border-b md:w-2/3 border-gray-300">
        <h1 className="text-3xl font-bold py-2 px-4">Mes Messages</h1>
        <p className="px-4 pb-2">
          Gerez vos conversations avec les vendeurs de vehicules.
        </p>
        <div className="w-full flex items-center justify-center">
          <span className="flex items-center justify-center w-full md:w-2/3 px-2 py-1">
            <button className="p-2 bg-emerald-800 border border-emerald-800 text-white rounded-l-md text-center">
              <Search />
            </button>
            <input
              type="text"
              value={searchValue}
              onChange={(e)=> setSearchValue(e.target.value)}
              placeholder="Recherchez une conversation"
              className="outline-none flex-1 px-2 py-2 focus:border border-emerald-800 rounded-r-md"
            />
          </span>
        </div>
      </header>
      <main className="flex-1 flex flex-col border-b border-gray-400 min-h-full px-2 py-1 md:w-2/3">
        {/* List Items */}
        {newChatList.map((item, i) => (
          <Item
            key={i}
            src_image={item.image}
            nom_vendeur={item.vendeur}
            nom_voiture={item.voiture}
            message={item.message}
            horodatage={item.heure}
            non_lue={item.non_lue}
            url={item.id}
          />
        ))}
        {newChatList.length === 0 && <p>Aucun Resultat.</p>}
        {/* List Items */}
      </main>
    </section>
  );
}
