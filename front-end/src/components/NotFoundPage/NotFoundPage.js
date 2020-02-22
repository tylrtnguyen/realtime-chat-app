import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <center><Link to="/"><h1>Return to Home Page</h1></Link></center>
        </div>
        
    )
}