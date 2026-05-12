import Loading from "@/src/components/load/loading";
import { Suspense } from "react";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex-1 flex flex-col max-w-screen w-[99vw]">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
