import React from 'react';
import {BrowserRouter,Switch, Route } from 'react-router-dom';

// Import components
import Register from './components/Register/Register';
import Chat from './components/Chat/Chat';
import Dashboard from './components/Dashboard/Dashboard'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import { GlobalProvider } from './context/GlobalState'
import  RoomsReport from './components/Dashboard/RoomsReport'
import UsersReport from './components/Dashboard/UsersReport'
import EventsReport from './components/Dashboard/EventsReport'

const App = () => (
    <GlobalProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register}/>
                <Route path="/chat" component={Chat}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="/dashboard/rooms" component={ RoomsReport }/>
                <Route path="/dashboard/users" component={ UsersReport }/>
                <Route path="/dashboard/events" component={ EventsReport }/>
                <Route path="*" component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    </GlobalProvider>
);

export default App;