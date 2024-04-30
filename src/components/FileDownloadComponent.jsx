import React from 'react';
import FileService from '../Services/FileService';

function FileDownloadComponent({ fileName }) {
    const handleDownload = () => {
        if (!fileName) {
            alert('File name is not specified.');
            return;
        }
        FileService.downloadFile(fileName).catch(error => {
            alert('Error downloading file: ' + error.message);
        });
    };

    return (
        <button onClick={handleDownload}>Download File</button>
    );
}

export default FileDownloadComponent;