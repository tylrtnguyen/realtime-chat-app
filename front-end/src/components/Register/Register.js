// Basic boilerplate for every component
// eslint-disable-next-line
import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import LoginTabs from '../LoginTabs/LoginTabs'



const Register = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div class="container">
            <Header />
            <div class="LoginTabs">
            <LoginTabs />
            </div>
        </div>

    )
};
export default Register;