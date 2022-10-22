import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../api/firebase"
import useUsersStore from "../api/usersStore"

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = useUsersStore(({ login }) => login)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                login(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className='form__control'>
                <label htmlFor="email">Email</label>
                <input className='form__input' type="email" id="email" name="email" placeholder="Email" onChange={handleEmailChange} value={email} autoComplete="email" />
            </div>
            <div className='form__control'>
                <label htmlFor="password">Password</label>
                <input className='form__input' type="password" id="password" name="password" placeholder="Password" onChange={handlePasswordChange} value={password} autoComplete="current-password" />
            </div>
            <div className='form__control'>
                <button className='form__submit-button' type="submit">Login</button>
            </div>
        </form>
    )
}
export default LoginForm