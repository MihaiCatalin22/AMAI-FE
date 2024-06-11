import React, { useState, useEffect } from "react";
import AgendaService from "../Services/AgendaService";
import Meeting from "../components/Meeting";
import Search from "../layoutComponents/Search";
import "../Style/Pages.css";

function PastTalks() {
    const [pastMeetings, setPastMeetings] = useState([]);
    const [duration, setDuration] = useState('');

    useEffect(() => {
        fetchMeetings();
    }, [duration]);

    const fetchMeetings = () => {
        AgendaService.getPastEvents(duration).then(result => {
            setPastMeetings(result.data);
        }).catch(error => console.error("Error fetching past meetings:", error));
    };

    const handleSearch = (searchResults) => {
        setPastMeetings(searchResults);
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    return (
        <>
            <Search onSearch={handleSearch} />
            <div className="home">
                <div className="meetings-wrapper">
                    <div><label className="page-tittle">Past Meetings</label></div>
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
                        {pastMeetings.map(meeting => (
                            <Meeting key={meeting.id} meeting={meeting} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PastTalks;
