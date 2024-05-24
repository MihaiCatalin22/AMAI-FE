import React, { useState, useEffect } from 'react';
import EventService from '../Services/EventService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../Style/Pages.css"
import { useAuth } from '../contexts/authContext';

const PresentationForm = () => {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isTuesday = (date) => {
    return date.getDay() === 2;
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate]);

  const fetchAvailableSlots = () => {
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const duration = selectedDuration ? parseInt(selectedDuration) : 10; 
    EventService.getAvailableSlots(formattedDate, duration)
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

    const speakerName = user.fullName || user.username; 

    EventService.createEvent(topic, description, speakerName, adjustedDate.toISOString())
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
    const value = event.target.value;
    setSelectedDuration((prev) => (prev === value ? null : value));
  };

  const SuccessModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
          <div className="modal">
            <p>Time slot booked successfully!</p>
            <button onClick={onClose} className="close-button">Close</button>
          </div>
          <div className="input-group">
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
            <div className="checkbox-group">
              <label className="medium-text">Select Duration:</label>
              <div className="small-text">
                <input
                  type="checkbox"
                  id="duration10"
                  name="duration"
                  value="10"
                  checked={selectedDuration === "10"}
                  onChange={handleDurationChange}
                  disabled={selectedDuration && selectedDuration !== "10"}
                />
                <label htmlFor="duration10"> 10 minutes</label>
              </div>
              <div className="small-text">
                <input
                  type="checkbox"
                  id="duration20"
                  name="duration"
                  value="20"
                  checked={selectedDuration === "20"}
                  onChange={handleDurationChange}
                  disabled={selectedDuration && selectedDuration !== "20"}
                />
                <label htmlFor="duration20"> 20 minutes</label>
              </div>
              <div className="small-text">
                <input
                  type="checkbox"
                  id="duration30"
                  name="duration"
                  value="30"
                  checked={selectedDuration === "30"}
                  onChange={handleDurationChange}
                  disabled={selectedDuration && selectedDuration !== "30"}
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
              filterDate={isTuesday}
              filterTime={(time) => {
                const hours = time.getHours();
                const duration = selectedDuration ? parseInt(selectedDuration) : 10;
                const minutes = duration; 
                return hours === 16;
              }}
              minDate={new Date()}
              maxTime={new Date(new Date().setHours(17, 0, 0))}
              minTime={new Date(new Date().setHours(16, 0, 0))}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <button type="submit" className="button">Create Presentation</button>
        </form>
      </>
  );
};

export default PresentationForm;
