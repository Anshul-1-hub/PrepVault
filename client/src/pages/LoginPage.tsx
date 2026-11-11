import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authClient } from "../lib/auth";

export default function LoginPage(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const {error} = await authClient.signIn.email({
            email, 
            password
        })

        if(error){
            setError(error.message || "Something went wrong.")
            setLoading(false)
            return
        }

        navigate("/dashboard")
    }

    return (
        <>
            <h1>Welcome back</h1>
            <p>Sign in to your PrepVault account</p>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>

            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </>
    )
}