import React from 'react';
import './styles.scss';

export default function NewMessageForm() {

    return (
        <form className="new-message-form">
            <textarea className="message-field" placeholder="Type your message here..." maxLength="200"/>
            <button className="send-button" type="submit" value="Send"><span className="fa fa-paper-plane"></span></button>
        </form>
    );
};