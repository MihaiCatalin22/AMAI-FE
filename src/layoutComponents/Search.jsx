import React from 'react';
import "../Style/Layout.css"
import AgendaService from "../Services/AgendaService";
import EventService from '../Services/EventService';
import { useState, useEffect } from "react";


function Search({onSearch, searchType }) {

  const [eventTopic, setEventTopic] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [semester, setSemester] = useState('current');
  
  const handleSearch = () => {
    if(!eventTopic && !speaker){
      if (searchType === 'upcoming') {
        AgendaService.getUpcomingEvents()
          .then(response => {
            console.log('All upcoming events found!', response.data);
            onSearch(response.data);
          })
          .catch(error => {
            console.log('Error found!', error);
          });
      } else if (searchType === 'past') {
        AgendaService.getPastEvents()
          .then(response => {
            console.log('All past events found!', response.data);
            onSearch(response.data);
          })
          .catch(error => {
            console.log('Error found!', error);
          });
        }
    }
    else if (eventTopic && speaker) {
      EventService.searchEventsByTopicAndSpeaker(eventTopic, speaker)
        .then(response => {
          console.log('Events found!', response.data);
          onSearch(response.data);
        })
        .catch(error => {
          console.log('Error found!', error);
        });
    } else {
      const promises = [];

    if (eventTopic) {
      promises.push(EventService.searchEventsByTopic(eventTopic));
    }

    if (speaker) {
      promises.push(EventService.searchEventsBySpeaker(speaker));
    }

    Promise.all(promises)
      .then(responses => {
        const events = responses.flatMap(response => response.data);
        console.log('Events found!', events);
        onSearch(events);
      })
      .catch(error => {
        console.log('Error found!', error);
      });
    }
    
  };

  return (
    <div className="search-container">
      <input type="text"
        className='text-black' 
        value={eventTopic}
        placeholder="Search by topic" 
        onChange={(e) => setEventTopic(e.target.value)}/>
      <input 
        type="text"
        className='text-black'
        value={speaker}
        placeholder="Search by speaker"
        onChange={(e) => setSpeaker(e.target.value)}/>
      <button onClick={handleSearch}>Search</button> 
    </div>
  );
}

export default Search;
