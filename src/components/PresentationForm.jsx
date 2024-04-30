import React, { useState, useEffect } from 'react';
import EventService from '../Services/EventService';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const PresentationForm = () => {
  const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleDateChange = (date) => setSelectedDate(date);

    const isThursday = (date) => date.getDay() === 4;
    const adjustDateToValidTimeSlot = (date) => {
        let adjustedDate = new Date(date);
        const userOffset = adjustedDate.getTimezoneOffset() * 60000;
        adjustedDate = new Date(adjustedDate.getTime() - userOffset);
        return adjustedDate;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const adjustedDate = adjustDateToValidTimeSlot(selectedDate);
        console.log("Adjusted date being sent:", adjustedDate.toISOString());
        if (!isThursday(selectedDate) || selectedDate.getHours() !== 16) {
            alert("Please select a valid time slot on Thursday between 16:00 and 17:00.");
            return;
        }

        EventService.createEvent(topic, description, "TestSpeaker", adjustedDate.toISOString())
            .then(() => {
                setTopic("");
                setDescription("");
                setShowSuccessModal(true);
            })
            .catch((error) => {
                console.error("Failed to create event:", error);
                alert(`Failed to create event: ${error.response?.data?.error || 'Unknown error'}`);
            });
    };

    return (
        <>
            {showSuccessModal && (
                <SuccessModal onClose={() => setShowSuccessModal(false)} />
            )}
            <form onSubmit={handleSubmit} style={formStyle} autoComplete='off'>
                <div style={inputGroupStyle}>
                    <label htmlFor="topic" style={labelStyle}>Topic:</label>
                    <input type="text" id="topic" value={topic} onChange={e => setTopic(e.target.value)} style={inputStyle} required />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="description" style={labelStyle}>Description:</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, height: '100px' }} required />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="presentationDate" style={labelStyle}>Presentation Date:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        filterDate={isThursday}
                        filterTime={(time) => time.getHours() === 16}
                        minDate={new Date()}
                        maxTime={new Date(new Date().setHours(17, 0, 0))}
                        minTime={new Date(new Date().setHours(16, 0, 0))}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <button type="submit" style={submitButtonStyle}>Create Presentation</button>
            </form>
        </>
    );
};

const SuccessModal = ({ onClose }) => (
  <div style={modalOverlayStyle}>
      <div style={modalStyle}>
          <p>Time slot booked successfully!</p>
          <button onClick={onClose} style={closeButtonStyle}>Close</button>
      </div>
  </div>
);

const formStyle = {
  maxWidth: '400px',
  margin: 'auto',
  marginTop: '20px',
  marginBottom: '50px'
};

const inputGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};
const fileButtonStyle = {
  backgroundColor: '#008CBA',
  color: 'white',
  padding: '10px 15px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const uploadButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px'
};
const submitButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '15px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom:'5px'
};
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000, 
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  zIndex: 1000,
};

const closeButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};
export default PresentationForm;
