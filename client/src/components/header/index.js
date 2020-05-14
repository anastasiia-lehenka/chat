import React from 'react';

export default function Header (props) {
    return (
        <header className="header">
            <div className="logo-section">
                <span className="logo fa fa-paper-plane"/>
                <span>Chat</span>
            </div>
            <div className="burger-menu" onClick={props.toggleMenu}>
                <span className="fa fa-bars"></span>
            </div>
        </header>
    );
}