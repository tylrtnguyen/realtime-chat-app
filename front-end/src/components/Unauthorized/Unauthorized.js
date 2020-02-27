import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
    return (
        <div>
            <h1>Unauthorized</h1>
            <center><Link to="/"><h1>Return to Home Page</h1></Link></center>
        </div>
        
    )
}