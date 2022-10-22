import React, { useState } from 'react'
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
            <a href="#" className='landing-form__link' onClick={toggleForm}>
                {login ? 'Register' : 'Login'}
            </a>
        </div>
    )
}

export default HomeForm