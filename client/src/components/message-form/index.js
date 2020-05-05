import React, {Component} from 'react';
import './styles.scss';

export default class MessageForm extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            messageText: '',
            redirect: null
        };
        this.state = this.initialState;
    }

    submitForm = e => {
        const { sendMessage } = this.props;
        const { messageText } = this.state;
        e.preventDefault();
        sendMessage(messageText);
        this.setState(this.initialState);
    };

    onMessageChange = e => {
        this.setState({ messageText: e.target.value });
    }

    render() {
        const { messageText } = this.state;

        return (
            <form className="new-message-form" onSubmit={this.submitForm}>
                <textarea
                    className="message-field"
                    value={messageText}
                    onChange={ this.onMessageChange }
                    placeholder="Type your message here..."
                    maxLength="200"
                />
                <button className="send-button" type="submit">
                    <span className="fa fa-paper-plane"></span>
                </button>
            </form>
        );
    }
};