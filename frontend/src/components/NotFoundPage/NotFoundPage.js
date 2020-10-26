import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as NotFoundIcon } from '../../assets/404.svg'
import './styles.css'


export default function NotFoundPage() {
    return (

            <Container maxWidth="lg" className="holder">
                <NotFoundIcon />
                <h1>Page Not Found</h1>
                <Link to="/"><Button variant="contained" color="primary">Return to home page</Button></Link>
            </Container>
        
        
    )
}