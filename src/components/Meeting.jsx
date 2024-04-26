import React from "react";
import './style/Meeting.css';

function Meeting({meeting}){

  
    return (
        <div className="meeting">
        <h2>{meeting.formattedDate}</h2>
        <h3>{meeting.topic}</h3>
        <p><strong>Speaker(s):</strong> {meeting.speakers.join(', ')}</p>
        <p>{meeting.description}</p>

      </div>
      );
}
export default Meeting;
