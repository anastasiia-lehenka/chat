import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../header';

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
    }

    onSubmitForm = e => {
        const {
            username,
            password
        } = this.state.user;

        e.preventDefault();

        const regexp = /^[a-zA-Z0-9]{3,}$/;

        if (!username.match(regexp) || !password.match(regexp)) {
            this.setState({
                incorrectInputMessage: 'Username and password can contain only letters and numbers and must be at least 3 characters long'
            });
            return;
        }

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => {
                if (!response.ok) throw response
                return response.json()
            })
            .then(res => {
                localStorage.setItem('token', res.token);
                this.setState({redirect: '/chat'})
            })
            .catch(err => {
                err.text().then( errorMessage => console.log(errorMessage));
                this.setState({incorrectInputMessage: 'Invalid password'})
            });
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

    render() {
        const {
            redirect,
            incorrectInputMessage
        } = this.state;

        const {
            username,
            password
        } = this.state.user;

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
                        {incorrectInputMessage &&
                        <p className="login-form__message">{incorrectInputMessage}</p>
                        }
                        <button className="login-form__button" type="submit">Login</button>
                    </form>
                </Fragment>
        );
    }
}