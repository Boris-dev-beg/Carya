export default function Layout_Chat({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex-1 flex flex-col max-w-screen w-[99vw] max-h-screen h-screen items-center justify-center">
      {children}
    </section>
  );
}
