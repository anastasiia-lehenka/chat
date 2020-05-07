import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            username: '',
            password: '',
            redirect: null,
            incorrectInputMessage: ''
        };
        this.state = this.initialState;
    }

    onSubmitForm = e => {
        const {
            username,
            password
        } = this.state;

        e.preventDefault();

        const regexp = /^[a-zA-Z0-9]{3,}$/;

        if (!username.match(regexp) || !password.match(regexp)) {
            this.setState({ incorrectInputMessage: 'Username and password can contain only letters and numbers and must be at least 3 characters long' });
            return;
        }
        this.setState({redirect: `/chat/?username=${username}`});
    };

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            incorrectInputMessage: ''
        });
    };

    render() {
        const {
            redirect,
            incorrectInputMessage
        } = this.state;

        return (
            redirect ?
                <Redirect to={redirect}/>
                : <form className="login-form" onSubmit={ this.onSubmitForm }>
                    <h2 className="login-form__title">Sign in</h2>
                    <p className="login-form__text">To join the chat enter your username and password</p>
                    <div className="login-form__inputs">
                        <label className="login-form__input"><span>Username</span><input type="text" name="username" onChange={this.onInputChange}/></label>
                        <label className="login-form__input"><span>Password</span><input type="password" name="password" onChange={this.onInputChange}/></label>
                    </div>
                    { incorrectInputMessage && <p className="login-form__message">{ incorrectInputMessage }</p>}
                    <button className="login-form__button" type="submit">Login</button>
                    <div className="login-form__signup-label">
                        <span>New user?</span>
                        <Link to="/chat" className="login-form__link">Sign up</Link>
                    </div>
                </form>
        );
    }
}