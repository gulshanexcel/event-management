'use client'
import { FormEventHandler, useState } from "react"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link"
import Alert from "@/components/Alert"

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn: FormEventHandler<HTMLFormElement> = (event: any) => {
    event.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Sign in</h1>
        <p className="text-center text-gray-600 mt-2">
          Sign in to your account to continue
        </p>
        <form onSubmit={handleSignIn} className="mt-8 space-y-6" method="POST">
          <Alert message="Account is created successfully" type="info" />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            size="large"
            placeholder="Enter your email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="large"
            placeholder="Enter your password"
            className="mt-4"
          />
          <Button type="submit" size="large" className="mt-8 w-full">
            Sign in
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-6">
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