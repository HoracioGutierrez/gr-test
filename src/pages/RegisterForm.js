import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../api/firebase'

const RegisterForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                return addDoc(collection(db,'users'), {
                    email: email,
                    uid: user.uid,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            })
            .then(() => {
                navigate('/login')
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
                <input className='form__input' type="email" id="email" name="email" placeholder="Email" onChange={handleEmailChange} />
            </div>
            <div className='form__control'>
                <label htmlFor="password">Password</label>
                <input className='form__input' type="password" id="password" name="password" placeholder="Password" onChange={handlePasswordChange} />
            </div>
            <div className='form__control'>
                <button className='form__submit-button' type="submit">Sign Up</button>
            </div>
        </form>
    )
}

export default RegisterForm