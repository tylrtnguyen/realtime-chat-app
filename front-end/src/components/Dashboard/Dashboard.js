import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { getLoginStatus } from '../Helper/Helper'

export default function Dashboard(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [ navigate, setNavigate ] =useState(false)

    // Pass [] as the second parameter to avoid activating it on component
    // updates but only for the mounting of the component.
    useEffect(() => {
        const authStatus = getLoginStatus()
        setIsLoggedIn(authStatus)
    }, [])

    const handleLogOut= () => {
        setIsLoggedIn(false)
        setNavigate(true)
        localStorage.removeItem('login')
        localStorage.removeItem('token')
    }

    if(navigate) {
        return <Redirect to="/" push={true} />;
    }
    if(isLoggedIn){
        return (
            <div>
            <h1>Admin dashboard is working!</h1>
            <button onClick={handleLogOut}>Logout</button>
            </div>
        )
    }
    else{
        return (
            <h1>Unauthorized</h1>
        )
    }
    
}