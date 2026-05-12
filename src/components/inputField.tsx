"use client";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
type Props = {
  label: string;
  placeholder: string;
  type: string;
  icon: LucideIcon;
  icon2?: LucideIcon;
  value?: string | number;
  onChange?: (a: string ) => void;
};

export function InputEntry({
  label,
  placeholder,
  icon: Icon,
  type,
  icon2: Icon2,
  value, onChange
}: Props) {
  const [showPassword, setShowPassword] = useState(Icon2 ? true : false);
  return (
    <div className="relative border rounded-md p-3 my-3 bg-slate-100 text-black flex gap-2 justify-center items-center">
      <h1 className="absolute -top-5 left-1 uppercase font-black">{label}</h1>
      <input
        type={!Icon2? type : showPassword? "text": "password"}
        value={value? value: ""}
        onChange={onChange ? (e) => onChange(e.target.value) : () => null}
        className="w-full outline-none"
        placeholder={placeholder}
      />
      {!Icon2 ? <Icon size={25} />: (
        showPassword? <Icon onClick={()=>setShowPassword(!showPassword)}/>: <Icon2 onClick={()=>setShowPassword(!showPassword)}/>
      )}
    </div>
  );
}
