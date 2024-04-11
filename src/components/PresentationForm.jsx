import React, { useState } from 'react';
import EventService from '../Services/EventService';

const PresentationForm = () => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [presentationDate, setPresentationDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const speaker = "TestSpeaker";

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    // here goes the upload logic, but for now we just show file name :D
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
    } else {
       console.log("No file selected");
    } 
  };
  

  const handleSubmit = (e) =>{
    e.preventDefault();

    EventService.createEvent(topic,description,speaker,presentationDate)
    .then(() =>{
      setTopic("")
      setDescription("")
      setPresentationDate("")
    }
    )
  }
  

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputGroupStyle}>
        <label htmlFor="topic" style={labelStyle}>Topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="description" style={labelStyle}>Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{...inputStyle, height: '100px'}}
          required
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="presentationDate" style={labelStyle}>Presentation Date:</label>
        <input
          type="datetime-local"
          id="presentationDate"
          value={presentationDate}
          onChange={(e) => setPresentationDate(e.target.value)}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="fileUpload" style={labelStyle}>Upload File:</label>
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        <button onClick={() => document.getElementById('fileUpload').click()} style={fileButtonStyle}>Choose File</button>
        <button onClick={handleFileUpload} style={uploadButtonStyle}>Upload</button>
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      </div>
      <br></br>
      <button type="submit" style={submitButtonStyle}>Create Presentation</button>
    </form>
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

export default PresentationForm;

