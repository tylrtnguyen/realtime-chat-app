import React from 'react';

import {BrowserRouter,Switch, Route } from 'react-router-dom';

// Import components
import Register from './components/Register/Register';
import Chat from './components/Chat/Chat';
import Dashboard from './components/Dashboard/Dashboard'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import { GlobalProvider } from './context/GlobalState'


const App = () => (
    <GlobalProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register}/>
                <Route path="/chat" component={Chat}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="*" component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    </GlobalProvider>
);

export default App;