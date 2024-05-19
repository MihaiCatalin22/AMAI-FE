import React from "react";
import { Link } from "react-router-dom";
import '../Style/Pages.css';
import FileUploadComponent from "./FileUploadComponent";
import FileService from "../Services/FileService";
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
      <Link to={`/meeting/${meeting.id}`}>{meeting.topic}</Link>
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


