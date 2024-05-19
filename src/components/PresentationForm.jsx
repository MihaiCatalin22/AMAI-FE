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
    EventService.getAvailableSlots(formattedDate)
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

  // const handleFileInputChange = (e) => {
  //   //setSelectedFile(e.target.files[0]);
  // };

  // const handleFileUpload = () => {
  //   // here goes the upload logic, but for now we just show file name :D
  //   if (selectedFile) {
  //     console.log("Selected file:", selectedFile.name);
  //   } else {
  //     console.log("No file selected");
  //   }
  // };

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
            <label htmlFor="presentationDate" className="medium-text">Presentation Date:</label>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                filterDate={isTuesday}
                filterTime={(time) => {
                  const hours = time.getHours();
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

