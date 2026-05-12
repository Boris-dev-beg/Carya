// "use client";
// import { Button } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.SubmitEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/auth/login`,{
//             method: "POST",
//             headers: {"content-type": "application/json"},
//             body: JSON.stringify({email, password})
//         }
//       );
//       if (response.ok) {
//         const user = await response.json()
//         localStorage.setItem("user", JSON.stringify(user));
//         console.log("User trouver:",user);
//         router.push("/");
//       } else {
//         throw new Error("Can't find the user");
//       }
//     } catch (error) {
//       console.log("Something went wront while we was fetching datas :", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-3 p-3 m-3 justify-center bg-slate-400 rounded-md shadow-md shadow-emerald-300"
//     >
//       <div className="flex flex-col gap-2 rounded-3xl p-2 m-2 bg-slate-300">
//         <h1 className="font-black text-black">Email:</h1>
//         <input
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           className="p-3 rounded-3xl bg-slate-200 text-black"
//         />
//       </div>
//       <div className="flex flex-col gap-2 rounded-3xl p-2 m-2 bg-slate-300">
//         <h1 className="font-black text-black">Password:</h1>
//         <input
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="text"
//           className="p-3 rounded-3xl bg-slate-200 text-black"
//         />
//       </div>
//       <div className="flex flex-col p-2 m-2 bg-slate-300 w-full">
//         <Button variant="contained" color="secondary" type="submit">
//           Connect
//         </Button>
//       </div>
//     </form>
//   );
// }

"use client";
import { ButtonSubmit } from "@/src/components/Buttons";
import { InputEntry } from "@/src/components/inputField";
import { Eye, EyeClosed, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const route = useRouter();
  const { data: session } = useSession();
  if (session) {
    console.log(session?.user);
  }

  // ! Functions / Comportements
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials");
      }

      if (!res?.error) route.push("/admin");
    } catch (error) {
      console.log("Erreur rencontrée :", error);
    }
  };
  // ! Render
  return (
    <div className="w-2/5 h-2/3">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 border border-amber-100 rounded-2xl p-5"
      >
        <div className="m-3 p-3">
          <h2 className="text-3xl font-bold">Log In</h2>
          <p className="">Please make sure to complete all the field</p>
          {error && (
            <span className="text-white bg-red-400 w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </span>
          )}
        </div>
        {/* Entries */}
        <div className="flex flex-col gap-3">
          <InputEntry
            label="Email"
            value={email}
            onChange={(e: string) => setEmail(e)}
            placeholder="email@example.com"
            icon={Mail}
            type="email"
          />
          <InputEntry
            label="Password"
            value={password}
            onChange={(e: string) => setPassword(e)}
            placeholder="password123example"
            icon={Eye}
            icon2={EyeClosed}
            type="text"
          />
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-3 p-3">
          <button
            type="submit"
            className="rounded-xl p-2 text-center flex items-center justify-center gap-3 bg-amber-500/90 hover:bg-amber-600 text-white"
          >
            Log In
          </button>
        </div>
        <div className="flex items-center justify-center gap-3 px-20">
          <span className="h-0.5 w-full bg-black rounded-3xl"></span>
          <h1 className="">OR</h1>
          <span className="h-0.5 w-full bg-black rounded-3xl"></span>
        </div>
        <div className="flex items-center justify-center gap-3 p-3">
          <ButtonSubmit
            name="Continue with GitHub"
            icon="GitHub"
            onClick={() => signIn("github")}
          />
          <ButtonSubmit name="Continue with Google" icon="Google" />
        </div>
      </form>
      <div className="flex flex-col justify-center items-center p-3">
        <Link
          href={"/auth/registration"}
          className="text-white hover:underline w-full items-center justify-center flex"
        >
          Didn&apos;t have an account yet ?{" "}
          <p className="text-blue-700"> Register</p>
        </Link>
      </div>
    </div>
  );
}
