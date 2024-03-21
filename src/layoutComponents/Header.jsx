import React from "react";
import { Link } from "react-router-dom";
import './style/Header.css'


function Header() {
    return (
        <div className="Header">
        <h2>Afternoon Meetings on Artificial Inteligence</h2>
        <nav>
            <Link to="/">Home</Link>
            <ul>       
                <li>
                    <Link to="talks">Talks</Link>
                </li>
                <li>
                    <Link to="explore">Explore</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
                <li>
                    <Link to="contacts">Contacts</Link>
                </li>
            </ul>
        </nav>
        
        </div>
        
    );
}
 export default Header;