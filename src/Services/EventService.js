import axios from 'axios';

const API_URL = "http://localhost:8080"; 
const afterSlash = "events";

const EventService = {
    getEvent: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`),

    getAllEvents: () => axios.get(`${API_URL}/${afterSlash}`),

    createEvent: (topic, description, speaker, speakers, date, duration) => axios.post(`${API_URL}/${afterSlash}`, {
        topic,
        description,
        speaker,
        speakers,
        date,
        duration
    }),

    updateEvent: (id, topic, description, date) => axios.put(`${API_URL}/${afterSlash}/${id}`, {
        topic,
        description,
        date
    }),

    deleteEvent: (id) => axios.delete(`${API_URL}/${afterSlash}/${id}`),

    searchEventsByTopic: (topic) => axios.get(`${API_URL}/${afterSlash}/search`, { params: { topic } }),

    getAvailableSlots: (date, duration) => {
        return axios.get(`${API_URL}/${afterSlash}/availableSlots`, {
            params: { date, duration }
        });
    },
}

export default EventService;
