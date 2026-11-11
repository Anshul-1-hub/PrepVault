import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { authClient } from "../lib/auth";

export default function SignupPage(){
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignup = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const {error} = await authClient.signUp.email({
            name,
            email,
            password
        })

        if(error){
            setError(error.message || "Something went wrong!")
            setLoading(false)
            return
        }

        navigate("/login")
    }

    return(
        <>
            <h1>Create your PrepVault account</h1>

            <form onSubmit={handleSignup}>
                <div>
                    <label>Name</label>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </>
    )
}