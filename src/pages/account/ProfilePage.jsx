import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import '../../Style/Pages.css';
import UserService from "../../Services/UserService.js";
import AgendaService from '../../Services/AgendaService.js';
import Meeting from '../../components/Meeting.jsx';

const ProfilePage = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [pastMeetings, setPastMeetings] = useState([]);
    const [futureMeetings, setFutureMeetings] = useState([]);
    const [displayFutureMeetings, setDisplayFutureMeetings] = useState(true);
    const [errorMessage, setErrorMessage]= useState("");

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

    useEffect(() => {
        if (displayFutureMeetings) {
            fetchFutureMeetings();
        } else {
            fetchPastMeetings();
        }
    }, [displayFutureMeetings]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const handleFileUploaded = (meetingId, fileName) => {
        const updatedMeetings = displayFutureMeetings
            ? futureMeetings.map(meeting => meeting.id === meetingId ? { ...meeting, fileName: fileName } : meeting)
            : pastMeetings.map(meeting => meeting.id === meetingId ? { ...meeting, fileName: fileName } : meeting);
        displayFutureMeetings ? setFutureMeetings(updatedMeetings) : setPastMeetings(updatedMeetings);
    };

    useEffect(() => {
        fetchPastMeetings();
    }, []);

    const fetchPastMeetings = () => {
        AgendaService.getPastEventsByUser(user.id).then(result => {
            const formattedMeetings = result.data.map(meeting => ({
                ...meeting,
                formattedDate: formatDate(meeting.date)
            }));
            setPastMeetings(formattedMeetings);
            console.log(formattedMeetings);
        }).catch(error => { 
            console.error("Error fetching past meetings by user:", error);
            setErrorMessage("Problem occurred when fetching the past meetings.");
        });
    };

    useEffect(() => {
        fetchFutureMeetings();
    }, []);

    const fetchFutureMeetings = () => {
        AgendaService.getUpcomingEventsByUser(user.id).then(result => {
            const formattedMeetings = result.data.map(meeting => ({
                ...meeting,
                formattedDate: formatDate(meeting.date)
            }));
            setFutureMeetings(formattedMeetings);
            console.log(formattedMeetings);
        }).catch(error => { 
            console.error("Error fetching future meetings by user:", error);
            setErrorMessage("Problem occurred when fetching the future meetings.");
        });
    };

    
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
            
            <div className='profile-page-info'>
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
            <div className="profile-meeting-list">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="meeting-buttons">
                    <button className={displayFutureMeetings ? 'active' : ''} onClick={() => setDisplayFutureMeetings(true)}>Future Meetings</button>
                    <button className={!displayFutureMeetings ? 'active' : ''} onClick={() => setDisplayFutureMeetings(false)}>Past Meetings</button>
                </div>
                <h2>{displayFutureMeetings ? 'Future Meetings' : 'Past Meetings'}</h2>
                {displayFutureMeetings ? (
                    futureMeetings.map(meeting => (
                        <Meeting key={meeting.id} meeting={meeting} onFileUploaded={handleFileUploaded} />
                    ))
                ) : (
                    pastMeetings.map(meeting => (
                        <Meeting key={meeting.id} meeting={meeting} onFileUploaded={handleFileUploaded} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
