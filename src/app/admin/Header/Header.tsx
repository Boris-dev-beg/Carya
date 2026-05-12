"use client";

import { useSession } from "next-auth/react";
import { Search} from "lucide-react";
import UserSpace from "./UserSpace";

export default function Header() {
    const {data} = useSession()

  return (
    <nav className="w-full p-5 border-b border-gray-600 bg-slate-900 text-white flex gap-4 items-center justify-center">
      <span className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-black text-white bg-blue-600 p-2 rounded-2xl italic">
          C.A.
        </h1>
        <h1>CARYA ADMIN</h1>
      </span>
      <span className="flex w-2/3 justify-center items-center focus:border-blue-400">
        <button className="flex justify-center p-3 border-none hover:bg-blue-400 bg-transparent rounded-md shadow-md hover:text-black text-white">
          <Search size={20} />
        </button>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Type something here..."
          className="flex-1 p-3 outline-none rounded-2xl bg-transparent border-b border-gray-600 focus:border-b-2 rounded-b-none focus:bg-blue-100 focus:text-black"
        />
      </span>
      <span className="flex justify-center items-center gap-3">
        <UserSpace email={data?.user?.email as string}/>
      </span>
    </nav>
  );
}
