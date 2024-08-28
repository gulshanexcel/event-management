'use client'

import Button from "@/components/Button"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

const Page = () => {
    const query = useSearchParams()
    const router = useRouter()

    return (
        <div className="h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 w-full max-w-[420px]">
                <h1 className="text-2xl font-bold text-center">
                    Invitations
                </h1>

                <p className="text-gray-600 mt-2 text-center">Invited by: {query.get('sender-username')}</p>
            
                <p className="mt-12">Event: {query.get('event-title')}</p>
                <p className="mt-2">Description: {query.get('description')}</p>
            
                <Button className="w-full mt-12" variant="secondary" onClick={() => router.push("/")}>Go to home</Button>
            </div>
        </div>
    )
}

export default Page