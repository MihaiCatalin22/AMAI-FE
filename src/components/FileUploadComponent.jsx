import React, { useState } from "react";
import FileService from "../Services/FileService";

function FileUploadComponent({ presentationId, onFileUploaded }) {
    const [file, setFile] = useState(null);

    const handleFileUpload = () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        FileService.uploadFile(file, presentationId)
            .then(response => {
                alert('File uploaded successfully');
                onFileUploaded(response.data.fileName);
            })
    };

    return (
        <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
    );
}

export default FileUploadComponent;