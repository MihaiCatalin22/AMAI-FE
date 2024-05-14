import React from 'react';
import "../Style/Layout.css"
import EventService from '../Services/EventService';
import { useState, useEffect } from "react";


function Search({onSearch}) {

  const [eventTopic, setEventTopic] = useState('');
  const [semester, setSemester] = useState('current');

  const handleSearch = () => {
    EventService.searchEventsByTopic(eventTopic)
        .then(response => {
          const events = response.data;
            console.log('Event found!', events);
            onSearch(events);
        })
        .catch(error => {
            console.log('Error found!', error);
        });
    };

  return (
    <div className="search-container">
      <input type="text"
        className='text-black' 
        value={eventTopic}
        placeholder="Search by topic" 
        onChange={(e) => setEventTopic(e.target.value)}/>
      <select className='text-black'>
        <option value="current">Current Semester</option>
        <option value="latest">Latest Semester</option>
      </select>
      <button onClick={handleSearch}>Search</button> 
    </div>
  );
}

export default Search;
