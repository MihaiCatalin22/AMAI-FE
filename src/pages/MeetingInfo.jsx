import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EventService from "../Services/EventService";
import FileService from "../Services/FileService";
import FileUploadComponent from "../components/FileUploadComponent";
import './style/MeetingInfo.css'
import { useAuth } from '../contexts/authContext';

function MeetingInfo() {
    const { hasRole, isAuthenticated, user } = useAuth();
    const { id } = useParams();
    const meetingId = parseInt(id, 10); // Convert id to integer
    const [meeting, setMeeting] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(null);

    useEffect(() => {
        EventService.getEvent(meetingId)
            .then(data => {
                console.log(data.data);
                setMeeting(data.data);
            })
            .catch(error => {
                console.error("Error fetching event:", error);
            });
    }, [meetingId]);
    const isUserSpeaker = meeting && meeting.speakers && meeting.speakers.includes(user.fullName);
    const handleDownload = (filename) => {
        if (filename) {
            FileService.downloadFile(filename);
        }
    };

    const handleFileUploaded = (uploadedFileName) => {
        setMeeting(prevMeeting => ({
            ...prevMeeting,
            fileName: uploadedFileName
        }));
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
        const year = date.getFullYear();

        // Ensure that single-digit days and months are padded with a leading zero
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}.${formattedMonth}.${year}`;
    }


    const handleDelete = () =>{
        const confirmDelete = window.confirm("Are you sure you want to delete this meeting?")
        if(confirmDelete){
            EventService.deleteEvent(meetingId)
                .then( () =>{
                    window.location.href = "/";
                })
                .catch(error => {
                    setDeleteStatus({success: true});
                    console.error("Error deleting meeting.", error);
                });
        }

    }

    const handleUpdate = () =>{
        window.location.href = `/meetings/${meetingId}/update`;
    }

    return (
        <div className="meeting-info-container">
            {deleteStatus && (
                <div className={deleteStatus.success ? "success-message" : "error-message"}>
                    {deleteStatus.success ? "Meeting deleted successfully!" : "Error deleting information. Please try again."}
                </div>
            )}

            {meeting && (
                <>
                   <div className="meeting-info-wrapper">
                    
                    <div className='meeting-info'>
                        <h1>{meeting.topic}</h1>
                        <h2>{formatDate(meeting.date)}</h2>
                        {meeting.speakers && meeting.speakers.length > 0 ? (
                            <p><strong>Speaker(s):</strong> {meeting.speakers.join(', ')}</p>
                        ) : (
                            <p><strong>Speaker:</strong> {meeting.speaker ? meeting.speaker.fullName : 'No Speaker'}</p>
                        )}
                        <p><strong>Description:</strong> {meeting.description}</p>
                        {isAuthenticated && (
                                    hasRole(['SPEAKER', 'ADMIN']) && (meeting.speaker && user.id === meeting.speaker.id)
                                ) && (
                            <>
                                <p>Upload / Download presentation:</p>
                                {!meeting.fileName && hasRole(['SPEAKER', 'ADMIN']) && (
                                    <FileUploadComponent presentationId={meeting.id} onFileUploaded={handleFileUploaded}
                                                         isUpdate={false}/>
                                )}
                                {meeting.fileName && (
                                    <>
                                        <button onClick={() => handleDownload(meeting.fileName)}>
                                            Download Presentation
                                        </button>
                                        <p>Update presentation:</p>
                                        {hasRole(['SPEAKER', 'ADMIN']) && (
                                            <FileUploadComponent presentationId={meeting.id}
                                                                 onFileUploaded={handleFileUploaded} isUpdate={true}/>
                                        )}
                                    </>
                                )}
                            </>
                        )}


                        <div className='buttons'>
                                {isAuthenticated && (
                                    hasRole(['SPEAKER', 'ADMIN']) && (meeting.speaker && user.id === meeting.speaker.id)
                                ) && (
                            {isAuthenticated && (hasRole(['SPEAKER', 'ADMIN']) || isUserSpeaker) && (
                                    <>
                                        <button className='delete-button' onClick={handleDelete}>Delete Meeting</button>
                                        <button className='update-button' onClick={handleUpdate}>Update Meeting</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>

            )}

        </div>
    );
}

export default MeetingInfo;