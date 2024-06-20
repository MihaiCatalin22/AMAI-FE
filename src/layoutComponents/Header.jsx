// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "../Style/Layout.css"


function Header() {
    return (
        <div className="Header">
        <h2>Afternoon Meetings on Artificial Intelligence</h2>
        <nav>
            <ul>       
                <li>
                    <Link to="/home">Meetings</Link>
                </li>
                <li>
                    <Link to="/meetings/past">Past Meetings</Link>
                </li>
                <li>
                    <Link to="/reserve">Reserve</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
        
        </div>
        
    );
}
 export default Header;