import axios from 'axios';

const API_URL = "http://localhost:8080"; 
const afterSlash = "agendas";

const AgendaService = {
    getUpcomingEvents: (duration) => axios.get(`${API_URL}/${afterSlash}/upcoming`, {
        params: { duration }
    }),

    getPastEvents: (duration) => axios.get(`${API_URL}/${afterSlash}/past`, {
        params: { duration }
    }),
    getUpcomingEventsByUser: (userId) => axios.get(`${API_URL}/${afterSlash}/upcoming/${userId}`, {
    }),

    getPastEventsByUser: (userId) => axios.get(`${API_URL}/${afterSlash}/past/${userId}`, {
    })
};
export default AgendaService;
