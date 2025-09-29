import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        const message = error.response?.data?.message || 'An unexpected error occurred.';
        if (Array.isArray(message)) {
            message.forEach((msg) => toast.error(msg));
        } else {
            toast.error(message);
        }

        return Promise.reject(error);
    },
);

export default api;
