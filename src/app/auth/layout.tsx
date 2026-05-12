import { ArrowBigLeftDash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col items-center bg-[url('/bg_auth_form.png')] bg-center bg-cover max-w-screen min-h-screen">
      <div className="w-full flex items-center justify-center overflow-hidden h-60">
        <span className="relative size-70 -mt-5">
          <Image
            src="/logo_auth_form.png"
            alt="logo form"
            fill
            loading="eager"
            sizes="(max-width: 640px): 30vw"
          />
        </span>
      </div>
      <div className="relative flex-1 -mt-15 backdrop-blur-lg flex flex-col px-3 py-2 items-center text-white w-[90%] sm:w-1/2 lg:w-1/3 mb-12 gap-4">
        <Link
          href="/v1/Accueil"
          className="absolute -left-4 md:-left-10 -top-10 rounded-full p-4 hover:bg-red-200 text-white hover:text-red-500 bg-gray-500 transition-colors duration-300"
        >
          <ArrowBigLeftDash />
        </Link>
        {children}
      </div>
    </section>
  );
}
