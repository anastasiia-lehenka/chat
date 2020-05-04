import React, {Component} from 'react';
import './app.scss';
import MessageList from './components/message-list'
import NewMessageForm from './components/new-message-form';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    _id: 1,
                    text: 'Hello'
                },
                {
                    _id: 2,
                    text: 'Higbjkddddd ddddddddddf ddddgfvbmfcjgirrfh rrrrrrrrrrrrr'
                }
            ]
        };
    }

    render() {
        const { messages } = this.state;

        return (
            <div className="App">
                <MessageList messageList = { messages }/>
                <NewMessageForm/>
            </div>
        );
    }
}
