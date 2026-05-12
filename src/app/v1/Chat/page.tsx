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
  {
    id: "/v1/Chat/2",
    image: "women_1.jpg",
    vendeur: "Sophie Martin",
    voiture: "Renault Clio 2018",
    message: "D'accord, a demain pour l'essai !",
    heure: "Hier",
  },
  {
    id: "/v1/Chat/3",
    image: "man_6.jpg",
    vendeur: "Marc Leroy",
    voiture: "Audi Q5 2017",
    message: "Bonjour, avez-vous recu mon message ?",
    heure: "Lundi",
    non_lue: 2,
  },
  {
    id: "/v1/Chat/4",
    image: "women_2.jpg",
    vendeur: "Nathalie Durand",
    voiture: "Penguet 208 2019",
    message: "vous: La voiture est-elle toujours disponible ?",
    heure: "20 avr.",
  },
  {
    id: "/v1/Chat/5",
    image: "man_5.jpg",
    vendeur: "Patrick Dubois",
    voiture: "Ford Focus 2016",
    message: "vous: Merci pour les infos, a bientot.",
    heure: "18 avr.",
  },
  {
    id: "/v1/Chat/6",
    image: "cartoon_woman_1.jpg",
    vendeur: "Nathalie Durand",
    voiture: "Penguet 208 2019",
    message: "vous: La voiture est-elle toujours disponible ?",
    heure: "20 avr.",
  },
  {
    id: "/v1/Chat/7",
    image: "man_4.jpg",
    vendeur: "Patrick Dubois",
    voiture: "Ford Focus 2016",
    message: "vous: Merci pour les infos, a bientot.",
    heure: "18 avr.",
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
