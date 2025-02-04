import axios from 'axios';

const API_URL = "http://localhost:8080"; 
const afterSlash = "events";

const EventService = {
    getEvent: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`),

    getAllEvents: () => axios.get(`${API_URL}/${afterSlash}`),

    createEvent: (topic, description, speakers, date) => axios.post(`${API_URL}/${afterSlash}`,
    {
        "topic": topic,
        "description": description,
        "speakers":[speakers] ,
        "date": date
    }
    ),

    updateEvent: (id, topic, description, date) => axios.put(`${API_URL}/${afterSlash}/${id}`,
    {
        "topic": topic,
        "description": description,
        "date": date
    }
    ),

    deleteEvent: (id) => axios.delete(`${API_URL}/${afterSlash}/${id}`),

    searchEventsByTopic: (topic) => axios.get(`${API_URL}/${afterSlash}/search?topic=${topic}`),

    getAvailableSlots: (date) => {
        return axios.get(`${API_URL}/${afterSlash}/availableSlots`, {
            params: { date }
        });
    },

}

export default EventService;