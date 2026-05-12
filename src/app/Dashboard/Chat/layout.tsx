export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex-1 flex flex-col min-h-screen max-w-screen w-[99vw]">
      {children}
    </section>
  );
}
