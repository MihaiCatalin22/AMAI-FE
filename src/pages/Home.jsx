import React from "react";
import Meeting from "../components/Meeting";
import About from "./About";
import './style/Home.css'

function Home() {

  const meetings = [
    {
      id: 1,
      date: '2024-03-12',
      topic: 'Introduction Fontys Research Data Management',
      description: 'Introduction to React fundamentals',
      speakers: ['Vera Timmers-Haagsma', 'Frank de Nijs']
    },
    {
      id: 2,
      date: '2024-03-19',
      topic: 'VVT project update',
      description: 'Managing state in React applications',
      speakers: ['Joris Geurts']
    }
  ];
  

      return (
        <div className="home">
          <div className="meetings-wrapper">
            <h1>Upcoming Meetings</h1>
            <div className="meeting-list">
              {meetings.map(meeting => (
                <Meeting key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
          <div className="about-wrapper">
            <About />
          </div>
        </div>
      );
    }

export default Home;