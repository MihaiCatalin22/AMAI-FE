import React from "react";
import Meeting from "../components/Meeting";
import './style/Home.css'

function PastTalks() {

  const meetings = [
    {
      id: 1,
      date: '2024-03-05',
      topic: 'Data and Nature in the City',
      description: 'I will explain why Fontys ICT needs a new research line where data is used to support decision-making about urban nature. What does this mean exactly, why is it interesting for us, what happens already in this direction, how will we finance it? This is a cooperation with Naturalis Biodiversity Center and other inspiring partners.',
      speakers: ['Simona Orzan']
    },
    {
      id: 2,
      date: '2024-01-23',
      topic: 'Generative AI in Education',
      description: '',
      speakers: ['Erdinc Sacan']
    },
    {
      id: 3,
      date: '2024-01-16',
      topic: 'AI fusion models for the Flower Power project',
      description: '',
      speakers: ['Georgiana Manolache']
    },
    {
      id: 4,
      date: '2024-01-09',
      topic: 'DEMAND Project Update',
      description: '',
      speakers: ['Leon Schrijvers']
    },
    {
      id: 5,
      date: '2023-12-19',
      topic: 'Quality of AI Systems (results of case studies & how to implement S6, Minor AI)',
      description: '',
      speakers: ['Merel Veracx']
    }
  ];
  

      return (
        <div className="home">
          <div className="meetings-wrapper">
            <h1>Past Meetings</h1>
            <div className="meeting-list">
              {meetings.map(meeting => (
                <Meeting key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
        </div>
      );
    }

export default PastTalks;