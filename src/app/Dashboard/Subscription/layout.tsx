export default function SubscriptionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col py-4 items-center justify-center">
      <header className="py-10 text-center w-full md:text-start md:px-4">
        <h1 className="text-3xl md:text-4xl font-bold border-b border-gray-300">
          Choisissez votre Abonnement
        </h1>
        <p className="py-4 text-gray-500">
          Selectionner le plan qui correspond le mieux a vos besoins
        </p>
      </header>
      <main className="w-full flex md:flex-row flex-col justify-center items-center gap-10 px-10 py-3 border-t border-gray-300">
        {children}
      </main>
    </section>
  );
}
