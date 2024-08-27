'use client'

import { FormEventHandler, useState } from "react"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link"

const Page = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn: FormEventHandler<HTMLFormElement> = (event: any) => {
        event.preventDefault();

        console.log({
            name,
            email,
            password
        })
    }

    return (
        <div className="w-screen bg-gray-100 h-screen flex justify-center items-center">
            <div className="w-1/2 py-12 max-w-[420px] bg-white p-4">
                <h1 className="text-3xl text-center font-bold">Create a new account</h1>
                <p className="text-center text-slate-600 mt-2">
                    Create a new account to continue
                </p>

                <form onSubmit={handleSignIn} className="mt-10 w-full px-4" action={""} method="POST">
                    <Input value={name} onChange={(e) => setName(e.target.value)} type="text" size="large" placeholder="Enter your name" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" size="large" placeholder="Enter your email" className="mt-3" />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" size="large" placeholder="Enter your password" className="mt-3" />

                    <Button type="submit" size="large" className="mt-10 w-full">
                        Sign up
                    </Button>
                </form>

                <p className="text-center text-slate-600 mt-4">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-blue-600 hover:opacity-80">Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default Page