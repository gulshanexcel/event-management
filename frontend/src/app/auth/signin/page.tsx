'use client'

import { FormEventHandler, useState } from "react"
import Button from "@/components/Button"
import Alert from "@/components/Alert"
import Input from "@/components/Input"
import Link from "next/link"
import { api } from '../../../api/api'
import { useRouter } from "next/navigation"

const Page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    
    const [alert, setAlert] = useState({ success: false, message: ""})

    const router = useRouter()

    const handleSignIn: FormEventHandler<HTMLFormElement> = (event: any) => {
        event.preventDefault();

        setLoading(true)
        api.post('/auth/signin/', {
            email,
            password
        }).then((data) => {
            setAlert({ message: "Logged in successfully.", success: true })

            localStorage.setItem("authToken", data.data.access)
            setTimeout(() => {
                router.push("/dashboard")
            }, 1000)
        }).catch((err) => {
           setAlert({ message: err.message, success: false })
        }).finally(() => {
            setEmail('');
            setPassword('');
            setLoading(false)
        })
    }

    return (
        <div className="w-screen bg-gray-100 h-screen flex justify-center items-center">
            <div className="w-1/2 py-12 max-w-[420px] bg-white p-4">
                <h1 className="text-3xl text-center font-bold">Sign in</h1>
                <p className="text-center text-slate-600 mt-2">
                  Sign in to your account to continue
                </p>

                <form onSubmit={handleSignIn} className="mt-10 w-full px-4" action={""} method="POST">
                    {alert.message && <Alert message={alert.message} type={alert.success ? "success" : "error"} />}
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" size="large" placeholder="Enter your email" className="mt-3" />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" size="large" placeholder="Enter your password" className="mt-3" />

                    <Button disabled={loading} type="submit" size="large" className="mt-10 w-full">
                        Sign in
                    </Button>
                </form>

                <p className="text-center text-slate-600 mt-4">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-blue-600 hover:opacity-80 transition">
                    Sign up
                  </Link>
                </p>
            </div>
        </div>
    )
}

export default Page