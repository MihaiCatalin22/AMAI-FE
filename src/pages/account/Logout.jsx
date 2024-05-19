import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const Logout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            logoutUser(); 
            navigate('/'); 
        }, 1500);

        return () => clearTimeout(timer);
    }, [logoutUser, navigate]);

    return (
        <div className="LogoutPage">
            <h2>Logging Out</h2>
            <p>Logging out, please wait...</p>
        </div>
    );
};

export default Logout;