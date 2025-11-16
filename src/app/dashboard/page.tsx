"use client";
import { useEffect } from "react";import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const router = useRouter();


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Bienvenido al panel de control.</p>
    </div>
  );
}
