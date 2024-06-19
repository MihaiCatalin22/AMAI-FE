import axios from 'axios';

const API_URL = "http://localhost:8080"; 
const afterSlash = "events";

const EventService = {
    getEvent: (id) => axios.get(`${API_URL}/${afterSlash}/${id}`),

    getAllEvents: () => axios.get(`${API_URL}/${afterSlash}`),

    createEvent: (topic, description, speaker, speakers, date, duration) => axios.post(`${API_URL}/${afterSlash}`,
    {
        "topic": topic,
        "description": description,
        "speaker": speaker,
        "speakers": speakers,
        "date": date,
        "duration": duration
    }
    ),

    updateEvent : (id, topic, description, date, speakers) => axios.put(`${API_URL}/${afterSlash}/${id}`, {
        topic: topic,
        description: description,
        date: date,
        speakers: speakers
    }),

    deleteEvent: (id) => axios.delete(`${API_URL}/${afterSlash}/${id}`),

    searchEventsByTopic: (topic) => axios.get(`${API_URL}/${afterSlash}/search?topic=${topic}`),
    
    searchEventsBySpeaker: (fullName) => axios.get(`${API_URL}/${afterSlash}/searchBySpeaker`, { params: { fullName } }),

    getAvailableSlots: (date, duration) => {
        return axios.get(`${API_URL}/${afterSlash}/availableSlots`, {
            params: { date, duration }
        });
    },

}

export default EventService;