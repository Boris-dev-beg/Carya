import { GitHub, Instagram, LinkedIn, Telegram } from "@mui/icons-material";
import { Dot } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="p-3 flex flex-col bg-emerald-800 text-white">
      <div className="flex lg:flex-row  lg:text-start items-center lg:items-start flex-col justify-between lg:px-6 lg:py-3 border-b border-gray-500">
        <div className="flex flex-col sm:items-start items-center gap-4 w-full md:max-w-1/2">
          <div className="overflow-hidden w-full h-20 flex items-center justify-center">
            <span className="relative w-full h-85 md:size-95">
                  <Image
                    src={"/logo_1.png"}
                    alt="Logo"
                    className="rounded-full"
                    fill
                    loading="eager"
                    sizes="(max-widht: 640px) 50vw"
                  />
                </span>
          </div>
          <p className="max-w-xl text-center sm:text-start wrap-normal">
            La voiture qu’il vous faut, au bout d’un message.
          </p>
          <span className="flex gap-3">
            <button className="p-1 rounded-full">
              <Telegram />
            </button>
            <button className="p-1 rounded-full">
              <Instagram />
            </button>
            <button className="p-1 rounded-full">
              <LinkedIn />
            </button>
            <button className="p-1 rounded-full">
              <GitHub />
            </button>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 my-4 lg:my-0 gap-5 md:gap-10">
          <span className="flex flex-col gap-2">
            <h1 className="font-bold text-[18px] my-2 p-0">A propos de nous</h1>
            <li className="hover:underline rounded-md list-none lg:list-disc">
              Qui somme-nous?
            </li>
            <li className="hover:underline rounded-md list-none lg:list-disc">
              Notre equipe
            </li>
          </span>
          <span className="flex flex-col gap-2">
            <h1 className="font-bold text-[18px] my-2 p-0">Informations</h1>
            <li className="hover:underline rounded-md list-none lg:list-disc">FAQ</li>
            <li className="hover:underline rounded-md list-none lg:list-disc">
              Mention legale
            </li>
          </span>
          <span className="flex flex-col gap-2">
            <h1 className="font-bold text-[18px] my-2 p-0">Assistance</h1>
            <li className="hover:underline rounded-md list-none lg:list-disc">
              Contacter nous
            </li>
            <li className="hover:underline rounded-md list-none lg:list-disc">
              Support client
            </li>
          </span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col items-center justify-between px-2 py-3 text-center text-[13px]">
        <p>&copy; 2026 CARYA. Tout droit reserver</p>
        <span className="flex gap-1 items-center justify-center">
          <a className="underline">Politique de confidentialite</a>
          <b className="bg-white size-1 rounded-full"></b>
          <a className="underline">Condition d&apos;utilisation</a>
        </span>
      </div>
    </footer>
  );
}
