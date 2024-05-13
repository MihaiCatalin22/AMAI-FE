import React from 'react';
import "../Style/Pages.css"

function About() {
  return (
    <div className="about">
        <div><label className="page-tittle">About AMAI</label></div>

        <p><strong>AMAI</strong> = Afternoon Meetings on AI 😅</p>
      
      <h3>We meet:</h3>
      <p>Every Tuesday at 16:00, TQ5-2.501 + online,
      to discuss ongoing projects on AI-related topics, research work, emerging trends, industry experiences, etc. The aim is informal sharing of information, opinions, and ideas, so that we all become a little bit wiser...</p>
      
      <p>Check the current schedule on the left.</p>
      
      <p>Send your comments or topic proposals to <a href="mailto:m.lamme@fontys.nl">m.lamme@fontys.nl</a></p>
    </div>
  );
}

export default About;
