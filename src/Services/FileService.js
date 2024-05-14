import axios from 'axios';

const API_URL = "http://localhost:8080/files";

const FileService = {
    uploadFile: (file, presentationId) => {
        let formData = new FormData();
        formData.append("file", file);

        return axios.post(`${API_URL}/upload/${presentationId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    downloadFile: (fileName) => {
        const url = `${API_URL}/download/${fileName}`;
        return axios.get(url, { responseType: 'blob' })
        .then(response => {
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }).catch(error => {
            console.error("Download error:", error);
            alert('Failed to download file.');
        });
    }
};

export default FileService;