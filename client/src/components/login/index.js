import React from 'react';
import { Link } from 'react-router-dom';

export default function Login () {
        return (
            <form className="login-form">
                <h2 className="login-form__title">Sign in</h2>
                <p className="login-form__text">To join the chat enter your username and password</p>
                <div className="login-form__inputs">
                    <label className="login-form__input"><span>Username</span><input type="text"></input></label>
                    <label className="login-form__input"><span>Password</span><input type="password"></input></label>
                </div>
                <span className="login-form__signup-label">New user?</span>
                <div className="login-form__links">
                    <Link to="/chat">
                        <button className="login-form__link" type="submit">Sign up</button>
                    </Link>
                    <Link to="/chat">
                        <button className="login-form__link" type="submit">Next ></button>
                    </Link>
                </div>
            </form>
    );
}