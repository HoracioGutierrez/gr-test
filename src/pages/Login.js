import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../api/firebase'
import useUsersStore from '../api/usersStore'
import Page from '../layout/Page'

const Login = () => {

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
        <Page>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </Page>
    )
}

export default Login