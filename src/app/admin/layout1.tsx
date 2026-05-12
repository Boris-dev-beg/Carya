import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <section className="min-w-screen min-h-screen">
    <Header />
    <main className="flex w-full h-full min-h-screen">
      <NavBar />
      <section className="bg-slate-500 flex flex-col gap-2 p-5 w-5/6">
      {children}
      </section>
    </main>
    </section>
    )
}
