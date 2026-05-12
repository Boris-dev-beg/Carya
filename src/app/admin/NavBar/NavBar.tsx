import { Car, ChartBarIcon, Settings, Star, User } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";

export default function NavBar() {
  return (
    <div className="flex flex-col p-2 gap-3 items-center justify-center border-r-2 w-1/6 border-r-gray-500 bg-slate-800 text-white">
      <div className="flex-1 w-full p-5 rounded-2xl border bg-slate-700 flex gap-3 flex-col justify-start items-center">
        <Link
          href={"/admin/"}
          className="hover:bg-blue-500 bg-blue-400 text-white w-full font-bold p-4 rounded-2xl shadow-md flex gap-5 items-center justify-center"
        >
          <ChartBarIcon size={20} /> Home
        </Link>
        <Link
          href={"/admin/profile"}
          className="hover:bg-blue-500 bg-gray-400 text-white w-full p-4 rounded-2xl shadow-md flex gap-5 items-center justify-center"
        >
          <User size={20} /> Profile
        </Link>
        <Link
          href={"/admin/listCar"}
          className="hover:bg-blue-500 bg-gray-400 text-white w-full p-4 rounded-2xl shadow-md flex gap-5 items-center justify-center"
        >
          <Car size={20} /> Garage
        </Link>
        <Link
          href={"/admin/settings"}
          className="hover:bg-blue-500 bg-gray-400 text-white w-full p-4 rounded-2xl shadow-md flex gap-5 items-center justify-center"
        >
          <Settings size={20} /> Settings
        </Link>
      </div>
      <div className="p-5 rounded-2xl flex gap-3 flex-col justify-center items-center">
        <Link
          href={"/admin/subscription"}
          className="hover:bg-yellow-500 bg-yellow-400 text-white w-full p-4 rounded-2xl shadow-md flex gap-5 items-center justify-center"
        >
          <Star size={20} /> Subscription
        </Link>
        <LogOutButton />
      </div>
    </div>
  );
}
