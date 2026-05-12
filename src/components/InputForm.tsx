import { LucideIcon } from "lucide-react";

interface PropsInput {
  icon: LucideIcon;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: string) => void;
}

export function InputForm({
  icon: Icon,
  placeholder,
  type,
  onChange,
  value,
}: PropsInput) {
  return (
    <div className="border border-white/50 p-2.5 font-bold flex gap-1 w-full rounded-md items-center justify-center">
      <Icon />
      <input
        type={type}
        value={value ? value : ""}
        onChange={onChange ? (e) => onChange(e.target.value) : () => null}
        placeholder={placeholder}
        className="outline-none flex-1 px-2"
      />
    </div>
  );
}
