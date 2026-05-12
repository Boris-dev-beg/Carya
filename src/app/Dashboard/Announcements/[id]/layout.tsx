export default function LayoutEditAnnouncement({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col w-full min-h-screen h-full">
      <header className="flex flex-col gap-2 px-3 md:px-10 py-6 border-b border-gray-300">
        <h1 className="font-bold text-3xl text-black">Editer l&apos;Annonce</h1>
        <p className="text-gray-600">
          Modifiez les informations de votre vehicule.
        </p>
      </header>{children}
    </section>
  );
}
