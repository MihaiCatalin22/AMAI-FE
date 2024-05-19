// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "../Style/Layout.css"
import { useAuth } from "../contexts/authContext";

function Header() {
    const { isAuthenticated, hasRole } = useAuth();

    console.log('Is Authenticated:', isAuthenticated); // Debugging statement
    console.log('Has Role (SPEAKER, ADMIN):', hasRole(['SPEAKER', 'ADMIN'])); // Debugging statement

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
                    {hasRole(['SPEAKER', 'ADMIN']) && (
                        <li>
                            <Link to="/reserve">Reserve</Link>
                        </li>
                    )}
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
 export default Header;