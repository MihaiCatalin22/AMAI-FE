import React from "react";
import { Link } from "react-router-dom";
import './style/Header.css'


function Header() {
    return (
        <div className="Header">
        <h2>Afternoon Meetings on Artificial Inteligence</h2>
        <nav>
            <ul>       
                <li>
                    <Link to="home">Meetings</Link>
                </li>
                <li>
                    <Link to="meetings/past">Past Meetings</Link>
                </li>
                <li>
                    <Link to="explore">Profile</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
            </ul>
        </nav>
        
        </div>
        
    );
}
 export default Header;