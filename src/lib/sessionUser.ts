"use client";
import { useSession } from "next-auth/react";

export const Data = () => {
  const { data } = useSession();
  return data;
};
