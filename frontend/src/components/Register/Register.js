// Basic boilerplate for every component
// eslint-disable-next-line
import React, { useState } from 'react'
import Header from '../Header/Header'
import LoginTabs from '../LoginTabs/LoginTabs'



const Register = () => {
    
    return (
        <div className="container">
            <Header />
            <div className="LoginTabs">
            <LoginTabs />
            </div>
        </div>

    )
};
export default Register;