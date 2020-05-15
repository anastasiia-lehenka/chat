import Message from '../message';
import React, {Component} from 'react';

export default class MessageList extends Component {

    constructor(props) {
        super(props);
        this.messagesEndRef = React.createRef()
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView();
    }

    render () {
        const {
            messageList,
            currentUser,
            typingMessage,
            warningMessage,
            userList
        } = this.props;

        return (
            <div className="message-list-container">
                <div className="message-list">
                    { messageList.map(message =>
                        <Message
                            key={message._id}
                            message={message}
                            currentUser={currentUser}
                            userList={ userList }
                        />
                    )}
                    { typingMessage && <p className="typing-message">{ typingMessage }</p>}
                    { warningMessage && <p className="warning-message">{ warningMessage }</p>}
                    <div ref={this.messagesEndRef} />
                </div>
            </div>
        );
    }
};