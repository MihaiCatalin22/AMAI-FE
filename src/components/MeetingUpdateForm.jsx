import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../Services/EventService';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import '../Style/Pages.css';
import FileUploadComponent from './FileUploadComponent';

const MeetingUpdateForm = () => {

    const { id } = useParams();
    const meetingId = parseInt(id); // Convert id to integer
    const [meeting, setMeeting] = useState(null);

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        EventService.getEvent(meetingId)
            .then(data => {
                console.log(data.data); 
                setMeeting(data.data);
                setTopic(data.data.topic);
                setDescription(data.data.description);
                const isoDate = new Date(data.data.date);

                // Check if isoDate is a valid date
                if (!isNaN(isoDate.getTime())) {
                    setSelectedDate(isoDate);
                }
                })
            .catch(error => {
                console.error("Error fetching event:", error);
            });
    }, [meetingId]);


    const handleDateChange = (date) => setSelectedDate(date);

    const isTuesday = (date) => date.getDay() === 2;
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
        if (!isTuesday(selectedDate) || selectedDate.getHours() !== 16) {
            alert("Please select a valid time slot on Tuesday between 16:00 and 17:00.");
            return;
        }

        EventService.updateEvent(meetingId, topic, description, adjustedDate.toISOString())
            .then(() => {
                setTopic("");
                setDescription("");
                setShowSuccessModal(true);
            })
            .catch((error) => {
                console.error("Failed to update event:", error);
                alert(`Failed to update event: ${error.response?.data?.error || 'Unknown error'}`);
            });
    };


    const handleFileUploaded = (uploadedFileName) => {
      setFileName(uploadedFileName);
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
                <div className='button-update'>
                <button type="submit" className='submit-update-button'>Update meeting information</button>

                </div>
            </form>
        </>
    );
};

const SuccessModal = ({ onClose }) => {

  const handleClose = () => {
    onClose();
    window.location.href = "/home";
  };

  return (
    <div style={modalOverlayStyle}>
        <div style={modalStyle}>
            <p>Meeting updated successfully!</p>
            <button onClick={handleClose} style={closeButtonStyle}>Close</button>
        </div>
    </div>
  );
};

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
  backgroundColor: '#505',
  color: 'white',
  padding: '10px 15px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const uploadButtonStyle = {
  backgroundColor: '#505',
  color: 'white',
  padding: '10px 15px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px'
};
const submitButtonStyle = {
  backgroundColor: '#505',
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
  backgroundColor: '#505',
    color: '#EFDAD1',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};
export default MeetingUpdateForm;
