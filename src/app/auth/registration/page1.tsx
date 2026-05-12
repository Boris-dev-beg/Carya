// ! Premier code du register form
// "use client";
// import { Button } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Registration() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "seller",
//   });
//   const router = useRouter();

//   const handleSubmit = async (e: React.SubmitEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/auth",
//         {
//           method: "POST",
//           headers: { "content-type": "application/json" },
//           body: JSON.stringify(formData),
//         },
//       );
//       if (response.ok) {
//         router.push("/");
//       } else {
//         throw new Error("Failed to create a User");
//       }
//     } catch (error) {
//       console.log("Erreur de creation de l'utilisateur:", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-3 rounded-2xl border-2 border-slate-900 flex flex-col gap-3"
//     >
//       <div className="p-3 border-2 border-red-500 rounded-2xl m-4 flex flex-col text-white">
//         <h1 className="font-bold text-black">Name</h1>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={(e) =>
//             setFormData((prev) => {
//               return { ...prev, [e.target.name]: e.target.value };
//             })
//           }
//           className="hover:ring-2 p-1.5 hover:ring-blue-200 bg-slate-500"
//         />
//       </div>
//       <div className="p-3 border-2 border-red-500 rounded-2xl m-4 flex flex-col text-white">
//         <h1 className="font-bold text-black">Email</h1>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={(e) =>
//             setFormData((prev) => {
//               return { ...prev, [e.target.name]: e.target.value };
//             })
//           }
//           className="hover:ring-2 p-1.5 hover:ring-blue-200 bg-slate-500"
//         />
//       </div>
//       <div className="p-3 border-2 border-red-500 rounded-2xl m-4 flex flex-col text-white">
//         <h1 className="font-bold text-black">Phone</h1>
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={(e) =>
//             setFormData((prev) => {
//               return { ...prev, [e.target.name]: e.target.value };
//             })
//           }
//           className="hover:ring-2 p-1.5 hover:ring-blue-200 bg-slate-500"
//         />
//       </div>
//       <div className="p-3 border-2 border-red-500 rounded-2xl m-4 flex flex-col text-white">
//         <h1 className="font-bold text-black">Password</h1>
//         <input
//           type="text"
//           name="password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData((prev) => {
//               return { ...prev, [e.target.name]: e.target.value };
//             })
//           }
//           className="hover:ring-2 p-1.5 hover:ring-blue-200 bg-slate-500"
//         />
//       </div>
//       <div className="p-3 border-2 border-red-500 rounded-2xl m-4 flex flex-col text-white">
//         <h1 className="font-bold text-black">Role</h1>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={(e) =>
//             setFormData((prev) => {
//               return { ...prev, [e.target.name]: e.target.value };
//             })
//           }
//           className="hover:ring-2 p-1.5 hover:ring-blue-200 bg-slate-500"
//         >
//           <option value="seller">Seller</option>
//           <option value="admin">Admin</option>
//           <option value="buyer">Buyer</option>
//         </select>
//       </div>
//       <div className="flex items-center justify-center gap-7">
//         <Button variant="contained" color="secondary">
//           Cancel
//         </Button>
//         <Button variant="contained" color="primary" type="submit">
//           Registration
//         </Button>
//       </div>
//     </form>
//   );
// }

// ! Deuxieme code du register form
"use client";

import { InputEntry } from "@/src/components/inputField";
import { Eye, EyeClosed, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  // ! States / Etats
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const route = useRouter();

  // ! Comportements / fonctions
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if(!name || !email || !password || !phone || !role){
        setError("All fields are necessary.");
        return;
    }

    try {
      const response_UserExist = await fetch(
        "http://localhost:3000/api/auth/userExists",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const { user } = await response_UserExist.json();
      if (user) {
        setError("User Already exists");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/auth/registration",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name, email, password, phone, role }),
        },
      );

      if (!response.ok) {
        throw new Error("Impossible de cree le compte pour l'instant :(");
      }
      const form = e.target;
      form.reset();
      route.push("/auth/login");
    } catch (error) {
      console.log("Error catched at register page:", error);
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
          <h2 className="text-3xl font-bold">Registration</h2>
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
          <InputEntry
            label="Password"
            value={password}
            onChange={(e: string) => setPassword(e)}
            placeholder="password123example"
            icon={Eye}
            icon2={EyeClosed}
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
              <option value="admin">Admin</option>
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
            Create Account
          </button>
        </div>
      </form>
      <div className="flex flex-col justify-center items-center p-3">
        <Link
          href={"/auth/login"}
          className="text-white hover:underline w-full items-center justify-center flex"
        >
          Already have an account ? <p className="text-blue-700">Log in</p>
        </Link>
      </div>
    </div>
  );
}
