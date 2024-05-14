import axios from 'axios';

const API_URL = "http://localhost:8080";
const afterSlash = "users";

    const api = axios.create({
        baseURL: API_URL
    });

    api.interceptors.request.use(
        config => {
        const user = sessionStorage.getItem('user');
        if (user) {
            const { jwt } = JSON.parse(user);
            config.headers['Authorization'] = `Bearer ${jwt}`;
            console.log("Axios request config:", config);
        }
        return config;
    },
    error => Promise.reject(error)
    );

  const login = async (userData) => {
    try {
      const response = await api.post('/login', userData);
      const data = response.data;
      if (data.jwt) {
        sessionStorage.setItem('user', JSON.stringify(data));
        api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
        return data;
      } else {
        throw new Error('JWT not received');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

const UserService = {
    register: (user, url) => axios.post(`${API_URL}/${afterSlash}/register`, {
        "user": {
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "fullName": user.fullName
        },
        "url": url
    }),
    verify: (code) => axios.get(`${API_URL}/${afterSlash}/verify/${code}`),
    login: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/${afterSlash}/login`, userData);
            const data = response.data;
            if (data.jwt) {
                sessionStorage.setItem('user', JSON.stringify(data));
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
                return data;
            } else {
                throw new Error('JWT not received');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
}

const userService = {
    UserService,
    login
}

export default userService;

