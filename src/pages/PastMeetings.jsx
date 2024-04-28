import React , {useState, useEffect}from "react";

import AgendaService from "../Services/AgendaService";

import Meeting from "../components/Meeting";
import Search from "../layoutComponents/Search";
import './style/Home.css'

function PastTalks() {
  
  const [pastMeetings,setPastMeetings] = useState([])
  
  useEffect(() => {
    AgendaService.getPastEvents().then(result => {
      setPastMeetings(result.data);
    });
  }, []);

  const handleSearch = (searchResults) => {
    setPastMeetings(searchResults);
  };

      return (
        <>
        <Search onSearch={handleSearch}/>
         <div className="home">
          <div className="meetings-wrapper">
            <h1>Past Meetings</h1>
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