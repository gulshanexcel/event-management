'use client'

import { FormEventHandler, useState } from "react"
import Button from "@/components/Button"
import Alert from "@/components/Alert"
import Input from "@/components/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { api } from '../../../api/api'

const Page = () => {
    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    
    const [alert, setAlert] = useState({ success: false, message: ""})

    const router = useRouter()

    const handleSignIn: FormEventHandler<HTMLFormElement> = (event: any) => {
        event.preventDefault();

        setLoading(true)
        api.post('/auth/register/', {
            username,
            email,
            password
        }).then((data) => {
            setAlert({ message: "Account is created successfully.", success: true })
            setTimeout(() => {
                router.push("/auth/signin")
            }, 1000)
        }).catch((err) => {
           setAlert({ message: err.message, success: false })
        }).finally(() => {
            setName('');
            setEmail('');
            setPassword('');
            setLoading(false)
        })
    }

    return (
        <div className="w-screen bg-gray-100 h-screen flex justify-center items-center">
            <div className="w-full mx-4 py-12 max-w-[420px] bg-white p-4">
                <h1 className="text-3xl text-center font-bold">Create a new account</h1>
                <p className="text-center text-slate-600 mt-2">
                    Create a new account to continue
                </p>

                <form onSubmit={handleSignIn} className="mt-10 w-full px-4" action={""} method="POST">
                    {alert.message && <Alert message={alert.message} type={alert.success ? "success" : "error"} />}
                    <Input value={username} onChange={(e) => setName(e.target.value.trim().replace(/\s*/g, ''))} type="text" size="large" placeholder="Username" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" size="large" placeholder="Email" className="mt-3" />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" size="large" placeholder="Password" className="mt-3" />

                    <Button disabled={loading} type="submit" size="large" className="mt-10 w-full">
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