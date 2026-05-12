import { StatsChart } from "@/src/components/StatChart";
import { Car, CheckCircle, Eye, Hourglass, LucideIcon } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  return (
    <section className="py-4 px-3 md:px-6">
      <div className="flex flex-col items-center justify-center">
        <span className="text-center md:text-start md:px-10 font-bold w-full">
          <h1 className="font bold text-4xl py-2 md:py-4">Tableau de bord</h1>
          <p className="pb-4 border-b border-gray-300">Gerez vos annonces et performance</p>
        </span>
        <div className="grid grid-cols-4 gap-3 place-items-center py-1 md:py-4 px-2 w-full">
          {StatTab.map((stat, index) => (
            <CardStat
              key={index}
              number={stat.number}
              icon={stat.icon}
              titre={stat.titre}
              color={stat.color}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full md:py-2">
        <StatsChart />
        <div className="bg-white p-2 rounded-lg shadow-md md:w-1/2">
          <h2 className="font-bold mb-2 text-lg text-gray-700 px-2">
            Messages Recents
          </h2>
          <div className="w-full">
            <span className="border-t border-gray-300 flex gap-2 p-1 justify-between">
              <span className="w-15 h-12 relative">
                <Image
                  src="/avatars/women_1.jpg"
                  alt="man_1.jpg"
                  fill
                  sizes="(max-width: 640px) 20vw"
                  className="object-cover"
                />
              </span>
              <span className="flex items-center line-clamp-1 gap-2 flex-1 ">
                <h1 className="font-bold">Marie R.</h1>
                <p>Interesse par la Golf 2020</p>
              </span>
              <p className="text-end">Il y a 5 min</p>
            </span>
            <span className="border-t border-gray-300 flex gap-2 p-1 justify-between">
              <span className="w-15 h-12 relative">
                <Image
                  src="/avatars/man_2.jpg"
                  alt="man_2.jpg"
                  fill
                  sizes="(max-width: 640px) 20vw"
                  className="object-cover"
                />
              </span>
              <span className="flex items-center line-clamp-1 gap-2 flex-1 ">
                <h1 className="font-bold">Paul T.</h1>
                <p>Visite possible du SUV ?</p>
              </span>
              <p className="text-end">Il y a 20 min</p>
            </span>
            <span className="border-t border-gray-300 flex gap-2 p-1 justify-between">
              <span className="w-15 h-12 relative">
                <Image
                  src="/avatars/women_2.jpg"
                  alt="woman_2.jpg"
                  fill
                  sizes="(max-width: 640px) 20vw"
                  className="object-cover"
                />
              </span>
              <span className="flex items-center line-clamp-1 gap-2 flex-1 ">
                <h1 className="font-bold">Sophie M.</h1>
                <p>Toujours dispo le Coupe ?</p>
              </span>
              <p className="text-end">Il y a 1 heure</p>
            </span>
          </div>
          <span className="w-full flex items-center justify-center border-t border-gray-300 pt-2 mt-2">
            <button className="px-6 rounded-md hover:bg-emerald-700 bg-emerald-800 text-white text-center py-1.5">
              Voir les Messages
            </button>
          </span>
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg shadow-md flex flex-col gap-2">
        <h2 className="font-bold mb-2 text-lg text-gray-700">
          Mes Annonces
        </h2>
        <div className="w-full grid grid-cols-3 md:gap-4">
          <div className="h-30 w-35 relative md:w-full">
            <span className="size-full absolute inset-0">
              <Image
                src="/car_Image/audi.jpeg"
                alt="/car_Image/audi.jpeg"
                fill
                sizes="(max-width: 640px) 30vw"
                className="object-cover"
              />
            </span>
            <span className="absolute inset-0 bg-linear-to-tr to-white from-transparent via-transparent"></span>
            <span className="absolute inset-0 bg-transparent z-10">
              <span className="w-full flex items-center">
                <h1 className="text-white font-semibold text-[13px] md:text-xl md:px-2 bg-gray-500 px-0.5 py-0.75 w-fit">Toyota</h1>
                <p className="font-semibold text-[13px] md:text-xl">Toyota Yaris 2018</p>
              </span>
              <h1 className="text-2xl font-bold text-end">8 500 $</h1>
            </span>
          </div>
          <div className="h-30 w-35 relative md:w-full">
            <span className="size-full absolute inset-0">
              <Image
                src="/car_Image/audi.jpeg"
                alt="/car_Image/audi.jpeg"
                fill
                sizes="(max-width: 640px) 30vw"
                className="object-cover"
              />
            </span>
            <span className="absolute inset-0 bg-linear-to-tr to-white from-transparent via-transparent"></span>
            <span className="absolute inset-0 bg-transparent z-10">
              <span className="w-full flex items-center">
                <h1 className="text-white font-semibold text-[13px] md:text-xl md:px-2 bg-gray-500 px-0.5 py-0.75 w-fit">Toyota</h1>
                <p className="font-semibold text-[13px] md:text-xl">Toyota Yaris 2018</p>
              </span>
              <h1 className="text-2xl font-bold text-end">8 500 $</h1>
            </span>
          </div>
          <div className="h-30 w-35 relative md:w-full">
            <span className="size-full absolute inset-0">
              <Image
                src="/car_Image/audi.jpeg"
                alt="/car_Image/audi.jpeg"
                fill
                sizes="(max-width: 640px) 30vw"
                className="object-cover"
              />
            </span>
            <span className="absolute inset-0 bg-linear-to-tr to-white from-transparent via-transparent"></span>
            <span className="absolute inset-0 bg-transparent z-10">
              <span className="w-full flex items-center">
                <h1 className="text-white font-semibold text-[13px] md:text-xl md:px-2 bg-gray-500 px-0.5 py-0.75 w-fit">Toyota</h1>
                <p className="font-semibold text-[13px] md:text-xl">Toyota Yaris 2018</p>
              </span>
              <h1 className="text-2xl font-bold text-end">8 500 $</h1>
            </span>
          </div>
        </div>
        <span className="w-full flex items-center justify-center">
          <button className="px-6 rounded-md hover:bg-emerald-700 bg-emerald-800 text-white text-center py-1.5">
            Gerer Mes Annonces
          </button>
        </span>
      </div>
    </section>
  );
}

const StatTab = [
  {
    icon: Car,
    titre: "Actives",
    number: 12,
    color: "text-green-700",
  },
  {
    icon: Hourglass,
    titre: "En Attente",
    number: 3,
    color: "text-yellow-700",
  },
  {
    icon: CheckCircle,
    titre: "Vendues",
    number: 20,
    color: "text-yellow-700",
  },
  {
    icon: Eye,
    titre: "Vues Totales",
    number: 8.54,
    color: "text-green-700",
  },
];

interface StatProps {
  icon: LucideIcon;
  titre: string;
  number: number;
  color: string;
}
const CardStat = ({ icon: Icon, titre, number, color }: StatProps) => {
  return (
    <span
      className={
        "flex flex-col md:flex-row gap-2 py-2 md:px-2 items-center justify-center shadow-md shadow-gray-300 bg-white w-25 md:min-w-40 md:w-fit rounded-md " +
        color
      }
    >
      <Icon className="size-10 md:size-25" />
      <span className="text-center w-full">
      <h1 className="md:text-xl font-bold">{titre}</h1>
      <h1 className="text-black font-bold text-xl">{number}</h1>
      </span>
    </span>
  );
};
