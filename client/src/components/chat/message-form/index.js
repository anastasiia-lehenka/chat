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
        this.props.showTypingMessage();
    }

    render() {
        const { messageText } = this.state;
        const { currentUser } = this.props;

        return (
                currentUser.isMuted ?
                    <div className="message-form message-form--muted">
                        <p>You can not write messages to this chat because you have been muted</p>
                    </div>
                    : <form className="message-form" onSubmit={this.submitForm}>
                        <input
                            className="message-field"
                            value={messageText}
                            type="text"
                            onChange={this.onMessageChange}
                            placeholder="Type your message here..."
                            maxLength="200"
                        />
                        <button className="send-button" type="submit">
                            <span className="fa fa-paper-plane"/>
                        </button>
                    </form>
        );
    }
};