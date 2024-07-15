"use client";
import { useBalance } from "@repo/store/useBalance";

export default function Home() {
  const balance = useBalance();
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world with balance {balance}
    </h1>
  );
}
