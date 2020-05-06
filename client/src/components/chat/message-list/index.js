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
            typingMessage
        } = this.props

        return (
            <div className="message-list-container">
                <div className="message-list">
                    {messageList.map(item =>
                        <Message
                            key={item._id}
                            text={item.text}
                            author={item.author}
                            currentUser={currentUser}
                        />
                    )}
                    { typingMessage && <p className="typing-message">{ typingMessage }</p>}
                    <div ref={this.messagesEndRef} />
                </div>
            </div>
        );
    }
};