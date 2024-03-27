import axios from 'axios';

const API_URL = "http://localhost:8080"; 
const afterSlash = "presentations";

const CardService = {
    getPresentation: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`),

    getAllPresentations: () => axios.get(`${API_URL}/${afterSlash}`),

    createPresentation: (title, description, speaker, presentationDate) => axios.post(`${API_URL}/${afterSlash}`,
    {
            "title": title,
            "description": description,
            "speaker": {
              "id": speaker.id,
              "fullName": speaker.fullName,
              "email": speaker.email
              // other fields of Speaker class that are needed
            },
            "presentationDate": presentationDate
    }
    ),

    updatePresentation: (id, title, description, presentationDate) => axios.put(`${API_URL}/${afterSlash}/${id}`,
    {
        "title": title,
        "description": description,
        "speaker": {
          "id": spreaker.id,
          "fullName": spreaker.fullName,
          "email": speaker.email
          // other fields of Speaker class that are needed
        },
        "presentationDate": presentationDate
    }
    ),

    deletePresentation: (id) => axios.delete(`${API_URL}/${afterSlash}/${id}`)
}

export default CardService;