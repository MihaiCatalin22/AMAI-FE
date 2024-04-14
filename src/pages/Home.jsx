import React, { useEffect, useState } from "react";

import AgendaService from "../Services/AgendaService";

import Meeting from "../components/Meeting";
import Search from "../layoutComponents/Search";
import About from "./About";

import './style/Home.css'


function Home() {

  const [upMeetings,setUpMeetings] = useState([])
  
  useEffect(() => {
    AgendaService.getUpcommingEvents().then(result => {
      setUpMeetings(result.data);
    });
  }, []);

  const handleSearch = (searchResults) => {
    setUpMeetings(searchResults);
  };

      return (
        <>
        <Search onSearch={handleSearch}/>
        <div className="home">
          
          <div className="meetings-wrapper">
            <h1>Upcoming Meetings</h1>
            <div className="meeting-list">
              {upMeetings.map(meeting => (
                <Meeting key={meeting.id} meeting={meeting} />
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