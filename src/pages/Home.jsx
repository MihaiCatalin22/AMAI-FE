import React, { useEffect, useState } from "react";
import AgendaService from "../Services/AgendaService";
import Meeting from "../components/Meeting";
import Search from "../layoutComponents/Search";
import About from "./About";
import { useAuth } from '../contexts/authContext';

import "../Style/Pages.css"

function Home() {
    const [upMeetings, setUpMeetings] = useState([]);
    const [duration, setDuration] = useState('');
    const { hasRole, isAuthenticated, user } = useAuth();
    console.log(user);

    const handleSearch = (searchResults) => {
        setUpMeetings(searchResults);
    };

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

    useEffect(() => {
        fetchMeetings();
    }, [duration]);

    const fetchMeetings = () => {
        AgendaService.getUpcomingEvents(duration).then(result => {
            const formattedMeetings = result.data.map(meeting => ({
                ...meeting,
                formattedDate: formatDate(meeting.date)
            }));
            setUpMeetings(formattedMeetings);
            console.log(formattedMeetings);
        }).catch(error => console.error("Error fetching upcoming meetings:", error));
    };

    const handleFileUploaded = (meetingId, fileName) => {
        const updatedMeetings = upMeetings.map(meeting => {
            if (meeting.id === meetingId) {
                return { ...meeting, fileName: fileName };
            }
            return meeting;
        });
        setUpMeetings(updatedMeetings);
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    return (
        <>
            <Search onSearch={handleSearch} searchType="upcoming"/>
            <div className="home">
                <div className="meetings-wrapper">
                    <label className="page-tittle">Upcoming Meetings</label>
                    <div>
                        <select value={duration} onChange={handleDurationChange}>
                            <option value="">All Durations</option>
                            <option value="10">10 minutes</option>
                            <option value="20">20 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">60 minutes</option>
                        </select>
                    </div>
                    <div className="meeting-list">
                        {upMeetings.map(meeting => (
                            <Meeting key={meeting.id} meeting={meeting} onFileUploaded={handleFileUploaded} />
                        ))}
                    </div>
                </div>
                <div className="about-wrapper">
                    <About />
                </div>
            </div>
        </>
    );
}

export default Home;
