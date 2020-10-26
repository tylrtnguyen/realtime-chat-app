import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as UnauthorizedIcon } from '../../assets/401.svg'
import Button from '@material-ui/core/Button'

export default function Unauthorized() {
    return (
        <div className="holder">
            <UnauthorizedIcon />
            <h1>Unauthorized</h1>
            <Link to="/"><Button variant="contained" color="primary">Return to home page</Button></Link>
        </div>
        
    )
}