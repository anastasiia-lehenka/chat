import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Chat from './components/chat';
import Login from './components/login';
import SignUp from './components/sign-up';

export default class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={ Login }/>
                    <Route path="/chat" component={ Chat }/>
                    <Route path="/sign-up" component={ SignUp }/>
                    <Route render={() => <Redirect to="/login" />} />
                </Switch>
            </Router>
        );
    }
}
