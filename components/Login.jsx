'use client'

import { use, useState } from "react"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistration, setIsRegistration] = useState('')

    return (
        <div className="login">
            <h2>{isRegistration ? 'Create an account' : 'Login'}</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="password" type="password" />
            <button>Submit</button>
            <div className="full-line" />
            <div>
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => {

                    setIsRegistration(!isRegistration)
                }}> {isRegistration ? 'Log in' : 'Sign up'}</button>
            </div>

        </div>
    )
}