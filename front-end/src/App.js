import React from 'react';

import {BrowserRouter as Router, Route } from 'react-router-dom';

// Import components
import Register from './components/Register/Register';
import Chat from './components/Chat/Chat';


const App = () => (
    <Router>
        <Route path="/" exact component={Register}/>
        <Route path="/chat" exact component={Chat}/>
    </Router>
);
export default App;