import { GitHub, Google } from "@mui/icons-material";

export function ButtonSubmit({name, icon, onClick}: {name: string, icon?: string, onClick?: () => void}) {
  return (
    <button
    onClick={onClick}
      type="submit"
      className="rounded-xl p-2 text-center flex items-center justify-center gap-3 bg-amber-500/90 hover:bg-amber-600 text-white"
    >
      {name} 
      {icon === "Google" && <Google className="size-20 text-black" />}
      {icon === "GitHub" && <GitHub className="size-20 text-black" />}
    </button>
  );
}
