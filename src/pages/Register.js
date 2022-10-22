import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../layout/Page'
import RegisterForm from './RegisterForm'

const Register = () => {

    return (
        <Page>
            <RegisterForm/>
        </Page>
    )
}

export default Register