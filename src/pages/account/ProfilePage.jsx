import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import '../../Style/Pages.css'

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <div className="profile-page">
            <h2>User's Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default ProfilePage;