import axios from 'axios';

const api = axios.create({
  // Vite utilise import.meta.env au lieu de process.env
  baseURL: import.meta.env.VITE_API_URL || 'https://kiwisportapp.com/api',
  withCredentials: true,
});

// Ajout automatique du Token JWT pour toutes les requêtes
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;