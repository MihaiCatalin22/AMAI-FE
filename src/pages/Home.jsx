import React, { useEffect, useState } from "react";
import AgendaService from "../Services/AgendaService";
import Meeting from "../components/Meeting";
import Search from "../layoutComponents/Search";
import About from "./About";

import "../Style/Pages.css"


function Home() {
  const [upMeetings,setUpMeetings] = useState([]);

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
      AgendaService.getUpcommingEvents().then(result => {
        const formattedMeetings = result.data.map(meeting => ({
          ...meeting,
          formattedDate: formatDate(meeting.date)
        }));
        setUpMeetings(formattedMeetings);
      }).catch(error => console.error("Error fetching upcoming meetings:", error));
    }, []);

  const handleFileUploaded = (meetingId, fileName) => {
    const updatedMeetings = upMeetings.map(meeting => {
      if (meeting.id === meetingId) {
        return { ...meeting, fileName: fileName };
      }
      return meeting;
    });
    setUpMeetings(updatedMeetings);
  };

    return (
      <>  
      <Search onSearch={handleSearch}/>
        <div className="home">
          <div className="meetings-wrapper">
            <label className="page-tittle">Upcoming Meetings</label>
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