import React, {Component} from 'react';

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
        if (messageText) {
            sendMessage(messageText);
            this.setState(this.initialState);
        }
    };

    onMessageChange = e => {
        this.setState({ messageText: e.target.value });
        this.props.socket.emit('typing', this.props.currentUser)
    }

    render() {
        const { messageText } = this.state;

        return (
            <form className="new-message-form" onSubmit={this.submitForm}>
                <input
                    className="message-field"
                    value={messageText}
                    type="text"
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