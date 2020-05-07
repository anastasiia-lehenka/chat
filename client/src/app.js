import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Chat from './components/chat';
import Login from './components/login';
import Header from './components/header';

export default class App extends Component {

    render() {
        return (
            <Router>
                <Header />
                {/*<Redirect to="/login" from="/"/>*/}
                <Route path="/" exact component={ Login }/>
                <Route path="/chat" component={ Chat }/>
            </Router>
        );
    }
}
