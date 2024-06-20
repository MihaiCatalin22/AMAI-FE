import React from "react";
import { Link } from "react-router-dom";
import '../Style/Pages.css';
import FileUploadComponent from "./FileUploadComponent";
import FileService from "../Services/FileService";
import { useAuth } from "../contexts/authContext";

function Meeting({ meeting }) {
  const { hasRole } = useAuth();
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

  const handleFileUploaded = (uploadedFileName) => {
    meeting.fileName = uploadedFileName;
  };
return (
    <div className="meeting">
        <h2><Link to={`/meeting/${meeting.id}`}>{meeting.topic}</Link></h2>

        {meeting.speakers && meeting.speakers.length > 0 ? (
            <p><strong>Speaker(s):</strong> {meeting.speakers.join(', ')}</p>
        ) : (
            <p><strong>Speaker:</strong> {meeting.speaker ? meeting.speaker.fullName : 'No Speaker'}</p>
        )}
        <p>{meeting.description}</p>

        {meeting.fileName && (
            <>
                <button onClick={() => handleDownload(meeting.fileName)}>
                    Download Presentation
                </button>

            </>
        )}
        <br/>
        <p><b>{meeting.formattedDate}</b></p>
        <p>Duration: <b>{meeting.duration}</b> minutes</p>
    </div>
);
}

export default Meeting;


