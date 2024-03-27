import axios from 'axios';

const API_URL = "http://localhost:8080"; 
const afterSlash = "agendas";

const AgendaService = {
    getUpcommingEvents: () => axios.get(`${API_URL}/${afterSlash}/upcoming`),

    getPastEvents: () => axios.get(`${API_URL}/${afterSlash}/past`),

}
export default AgendaService;
