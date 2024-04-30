import React from "react";
import FileService from "../Services/FileService";
import FileUploadComponent from "./FileUploadComponent";
import './style/Meeting.css';

function Meeting({ meeting }) {

  const handleDownload = (filename) => {
    if (filename) {
        FileService.downloadFile(filename);
    }
};

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && onFileUpload) {
      onFileUpload(meeting.id, file);
    }
  };

return (
  <div className="meeting">
      <h2>{meeting.formattedDate}</h2>
      <h3>{meeting.topic}</h3>
      <p><strong>Speaker(s):</strong> {meeting.speakers.join(', ')}</p>
      <p>{meeting.description}</p>
      {!meeting.fileName && (
          <>
              <FileUploadComponent presentationId={meeting.id} onFileUploaded={handleFileSelect} />
          </>
      )}
      {meeting.fileName && (
          <>
              <button onClick={() => handleDownload(meeting.fileName)}>
                  Download Presentation
              </button>
              <p>File: {meeting.fileName}</p>
          </>
      )}
  </div>
);
}

export default Meeting;


