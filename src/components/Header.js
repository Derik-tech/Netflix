import React from 'react';
import './Header.css';
import Netflix from './Netflix.png';
import Avatar from './Netflix-avatar.png';

function Header({black}) {
    return(
        <header className={black ? 'black' : ''}>
            <div className="logo">
                <img src={Netflix} alt="Netflix"></img>
            </div>
            <div className="user">
                <img src={Avatar} alt="Icon"></img>
            </div>
        </header>
    )
}

export default Header;
