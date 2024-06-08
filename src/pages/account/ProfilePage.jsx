import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import '../../Style/Pages.css';
import UserService from "../../Services/UserService.js";

const ProfilePage = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (user) {
            UserService.getUserById(user.id).then(result => {
                console.log(result.data);
                setUserDetails(result.data);
            });
        }
    }, [user]);

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    const handleSubscribe = () => {
        UserService.subscribe(userDetails.id,1)
        console.log("Subscribed to calendar");
        setUserDetails(prevDetails => ({ ...prevDetails, calendarSubscribed: true }));
    };

    const handleUnsubscribe = () => {
        UserService.subscribe(userDetails.id,0)
        console.log("Unsubscribed from calendar");
        setUserDetails(prevDetails => ({ ...prevDetails, calendarSubscribed: false }));
    };

    return (
        <div className="profile-page">
            <h2>User's Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {userDetails && (
                userDetails.calendarSubscribed ? (
                    <button onClick={handleUnsubscribe}>Unsubscribe from calendar</button>
                ) : (
                    <button onClick={handleSubscribe}>Subscribe to calendar</button>
                )
            )}
        </div>
    );
};

export default ProfilePage;
