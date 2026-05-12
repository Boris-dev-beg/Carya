import { useEffect, useRef } from "react";

interface MessageProps {
  message: { contenu: string; date: string; role: string };
}

export function Message({ message }: MessageProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fonction pour scroller en bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // À chaque nouveau message, on scrolle
  useEffect(() => {
    scrollToBottom();
  }, [message]);
  if(message.contenu.trim() === "") return
  return (
    <div
      className={`${message.role === "buyer" ? "ml-auto text-right" : "text-left"} flex justify-center max-w-3/4 w-fit mx-2 flex-col relative`}
    >
      <p
        className={`${message.role === "buyer" ? "bg-emerald-700 text-white text-start shadow-2xs shadow-emerald-900" : "bg-gray-400 shadow-2xs shadow-gray-700"} relative p-2 rounded-md`}
      >
        {message.contenu}
        <span
          className={`absolute size-4 ${message.role === "buyer" ? "bg-emerald-700 -right-1.5" : "bg-gray-400 -left-1.5"} top-1.5 rotate-45`}
          style={{zIndex: -10}}
        ></span>
      </p>
      <p>
        {message.role === "buyer" ? "Envoyer a " : "Recu a "} {message.date}
      </p>
      {/* Élément invisible qui sert de repère */}
      <div ref={messagesEndRef} />
    </div>
  );
}
