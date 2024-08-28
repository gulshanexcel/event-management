'use client'

import { useEffect } from 'react'
import Sidebar from "@/components/Sidebar";
import EventOverview from "@/components/EventOverview";
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/auth/signin")
    }
  })

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <EventOverview />
      </main>
    </div>
  );
}