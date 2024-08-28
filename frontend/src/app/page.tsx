'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const token = localStorage.getItem("authToken")

    useEffect(() => {
        if (!token) {
            router.push("/auth/signin")
        } else {
            router.push("/dashboard")
        }
    }, [])

    return <h1>Loading...</h1>
}

export default Page