import React, { useState, useEffect } from 'react';
import EventService from '../Services/EventService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../Style/Pages.css";
import { useAuth } from '../contexts/authContext';

const PresentationForm = () => {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const [isUserSpeaker, setIsUserSpeaker] = useState(true);

  const [selectedDuration, setSelectedDuration] = useState(10); // Default to 10 minutes


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isTuesday = (date) => {
    return date.getDay() === 2;
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate, selectedDuration]);

  const fetchAvailableSlots = () => {
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    EventService.getAvailableSlots(formattedDate, selectedDuration)
      .then(response => {
        setAvailableSlots(response.data);
      })
      .catch(error => {
        console.error('Error fetching available slots:', error);
      });
  };

  const adjustDateToValidTimeSlot = (date) => {
    let adjustedDate = new Date(date);
    const userOffset = adjustedDate.getTimezoneOffset() * 60000;
    adjustedDate = new Date(adjustedDate.getTime() - userOffset);
    return adjustedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a presentation.");
      return;
    }
    const adjustedDate = adjustDateToValidTimeSlot(selectedDate);
    if (!isTuesday(selectedDate) || selectedDate.getHours() !== 16) {
      alert("Please select a valid time slot on Tuesday between 16:00 and 17:00.");
      return;
    }

    let finalSpeakerName;
    if (isUserSpeaker) {
      finalSpeakerName = user;
    } else {
      finalSpeakerName = null;
    }

    EventService.createEvent(topic, description, user, isUserSpeaker ? null : speakerName, adjustedDate.toISOString(),selectedDuration)
        .then(() => {
          setTopic("");
          setDescription("");
          setShowSuccessModal(true);
        })
        .catch((error) => {
          console.error("Failed to create event:", error);
          if (error.response) {
            console.log("Server response:", error.response.data);
            alert(`Failed to create event: ${error.response.data.error || 'Unknown error'}`);
          }
        });
  };

  const handleDurationChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedDuration(value);
    setSelectedDate(new Date()); // Reset the selected date to recalculate time slots
  };

  const CustomTimeInput = ({ date, onChange }) => {
    const duration = selectedDuration || 10; // Default to 10 if not selected
    const startTime = new Date(date);
    startTime.setHours(16, 0, 0, 0); // 4:00 PM
    const endTime = new Date(date);
    endTime.setHours(16, 60 - duration, 0, 0); 

    const times = [];
    let currentTime = startTime;
    while (currentTime < endTime) {
      times.push(new Date(currentTime));
      currentTime = new Date(currentTime.getTime() + duration * 60000);
    }

    const handleTimeChange = (event) => {
      const newTime = new Date(date);
      const [hours, minutes] = event.target.value.split(':').map(Number);
      newTime.setHours(hours);
      newTime.setMinutes(minutes);
      onChange(newTime);
    };

    return (
      <select value={`${date.getHours()}:${date.getMinutes()}`} onChange={handleTimeChange}>
        {times.map((time, index) => (
          <option key={index} value={`${time.getHours()}:${time.getMinutes()}`}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </option>
        ))}
      </select>
    );
  };
  const SuccessModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
          <div className="modal">
            <p>Time slot booked successfully!</p>
            <button onClick={onClose} className="close-button">Close</button>
          </div>
          <div className="input-group">
            {/* <label htmlFor="fileUpload" className="label">Upload File:</label>
            <input
                type="file"
                id="fileUpload"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            /> */}
            {/* <button onClick={() => document.getElementById('fileUpload').click()} className="file-button">Choose File</button>
            <button onClick={handleFileUpload} className="upload-button">Upload</button>
            {selectedFile && <p>Selected file: {selectedFileName}</p>} */}
          </div>
          <br></br>
        </div>
    );
  };

  return (
    <>
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
      <form onSubmit={handleSubmit} id="presentation-form" autoComplete='off'>
        <div className="input-group">
          <label htmlFor="topic" className="medium-text">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description" className="medium-text">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            required
          />
        </div>
        
          <div className="input-group">
          <input
            type="checkbox"
            id="isUserSpeaker"
            checked={isUserSpeaker}
            onChange={(e) => setIsUserSpeaker(e.target.checked)}
          />
          <label htmlFor="isUserSpeaker" className="medium-text">I am the speaker</label>
        </div>
        <div className="input-group">
          <label htmlFor="speakerName" className="medium-text">Speaker Name:</label>
          <input
            type="text"
            id="speakerName"
            onChange={(e) => setSpeakerName(e.target.value.split(',').map(speaker => speaker.trim()))}
            className="input"
            disabled={isUserSpeaker}
            required={!isUserSpeaker}
          />
        </div>
        <div className="input-group">
          <div className="checkbox-group">
            <label className="medium-text">Select Duration:</label>
            <div className="small-text">
              <input
                type="radio"
                id="duration10"
                name="duration"
                value="10"
                checked={selectedDuration === 10}
                onChange={handleDurationChange}
              />
              <label htmlFor="duration10"> 10 minutes</label>
            </div>
            <div className="small-text">
              <input
                type="radio"
                id="duration20"
                name="duration"
                value="20"
                checked={selectedDuration === 20}
                onChange={handleDurationChange}
              />
              <label htmlFor="duration20"> 20 minutes</label>
            </div>
            <div className="small-text">
              <input
                type="radio"
                id="duration30"
                name="duration"
                value="30"
                checked={selectedDuration === 30}
                onChange={handleDurationChange}
              />
              <label htmlFor="duration30"> 30 minutes</label>
            </div>
          </div>
          <br/>
          <label htmlFor="presentationDate" className="medium-text">Presentation Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeIntervals={selectedDuration}
            filterDate={isTuesday}
            minDate={new Date()}
            maxTime={new Date(new Date().setHours(16, 60 - selectedDuration, 0))}
            minTime={new Date(new Date().setHours(16, 0, 0))}
            dateFormat="MMMM d, yyyy h:mm aa"
            customTimeInput={<CustomTimeInput date={selectedDate} onChange={handleDateChange} />}
            //disabledKeyboardNavigation // Disable manual input
          />
        </div>
        <button type="submit" className="button">Create Presentation</button>
      </form>
    </>
  );
};

export default PresentationForm;
