import Loading from "@/src/components/load/loading";
import { Suspense } from "react";

export default function Layout_Chat({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="fixed inset-0 z-60 backdrop-blur-md flex-1 flex flex-col max-w-screen w-[99vw] max-h-full h-full items-center justify-center">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
