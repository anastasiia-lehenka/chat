import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../header';
import {sendLoginRequest} from '../../api';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            user: {
                username: '',
                password: '',
                image: ' '
            },
            redirect: null,
            incorrectInputMessage: ''
        };
        this.state = this.initialState;
    };

    onSubmitForm = e => {
        const {
            username,
            password
        } = this.state.user;

        e.preventDefault();

        if (!this.validateCredentials(username, password)) {
            this.setState({
                incorrectInputMessage: 'Username and password can contain only letters and numbers and must be at least 3 characters long'
            });
            return;
        };

        sendLoginRequest(this.state.user)
            .then(this.handleSuccessfulLogin)
            .catch(this.handleFailedLogin);
    };

    onInputChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            },
            incorrectInputMessage: ''
        });
    };

    validateCredentials = (username, password) => {
        const regexp = /^[a-zA-Z0-9]{3,}$/;

        return username.match(regexp) && password.match(regexp);
    };

    handleSuccessfulLogin = data => {
        localStorage.setItem('token', data.token);
        this.setState({redirect: '/chat'})
    };

    handleFailedLogin = error => {
        let errorMessage;
        if (error.status === 500) {
            errorMessage = error.text();
        } else {
            errorMessage = 'Invalid password';
        }
        this.setState({incorrectInputMessage: errorMessage})
    };

    render() {
        const {
            redirect,
            incorrectInputMessage
        } = this.state;

        return (
            redirect ?
                <Redirect to={redirect}/>
                : <Fragment>
                    <Header/>
                    <form className="login-form" onSubmit={this.onSubmitForm}>
                        <h2 className="login-form__title">Sign in</h2>
                        <p className="login-form__text">To join the chat enter your username and password</p>
                        <div className="login-form__inputs">
                            <label className="login-form__input"><span>Username</span>
                                <input type="text" name="username" onChange={this.onInputChange}/>
                            </label>
                            <label className="login-form__input"><span>Password</span><
                                input type="password" name="password" onChange={this.onInputChange}/>
                            </label>
                        </div>
                        { incorrectInputMessage &&
                        <p className="login-form__message">{incorrectInputMessage}</p>
                        }
                        <button className="login-form__button" type="submit">Login</button>
                    </form>
                </Fragment>
        );
    }
}