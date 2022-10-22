import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const HomeForm = () => {

    const [login, setLogin] = useState(false)

    const toggleForm = () => {
        setLogin(!login)
    }

    return (
        <div className='landing-form flex'>
            {login ? <LoginForm /> : <RegisterForm/>}
            <nav className='landing-form__actions'>
                <a href="#" className='landing-form__link' onClick={toggleForm}>
                    {login ? 'Register' : 'Login'}
                </a>
                <Link to="/forgot-password" className='landing-form__link'>Forgot Password</Link>
            </nav>
        </div>
    )
}

export default HomeForm