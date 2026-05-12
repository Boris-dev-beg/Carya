import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const getUser = async (email: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/getUser`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json()
    if (!res.ok) throw new Error(data.error||"Can't find user : Fatale error");
    return data;
  } catch (err) {
    console.log("Error Finded:", err);
    return;
  }
};

interface User{
  name: string;
  role:string;
  email: string;
}

export default function UserSpace({ email }: { email: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!email) return;
      const data = await getUser(email);
      setUser(data?.user); // attention: ton API renvoie { users }
    };
    fetchUser();
  }, [email]);
  // const user = await getUser(email as string);

  console.log("User Info :", user);
  return (
    <>
      <Star size={20} className="text-yellow-300" />
      <span className="flex justify-center items-center p-2 gap-2">
        <Image
          src="/avatar1.jpg"
          alt="avatar"
          height={50}
          loading="eager"
          width={50}
          className="h-16 w-16 rounded-full p-1 border border-gray-400"
        />
        <h1>
          {user?.name}-({user?.role})
        </h1>
      </span>
    </>
  );
}
