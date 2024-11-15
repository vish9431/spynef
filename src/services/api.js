import axios from 'axios';

const api = axios.create({
  baseURL: 'https://spyneb.onrender.com', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const API_BASE_URL = 'https://spyneb.onrender.com';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-car.jpg';
  const cleanPath = imagePath.replace(/^uploads\//, '');
  return `${API_BASE_URL}/uploads/${cleanPath}`;
};

//export { authService, carService, getImageUrl };

export const authService = {
  login: (email, password) =>
    api.post('/token', new URLSearchParams({ username: email, password })),
  register: (userData) => api.post('/register', userData),
};

export const carService = {
  createCar: (formData) => {
    
    return api.post('/cars/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getCars: (search) => api.get('/cars/', { params: { search } }),
  getCar: (id) => api.get(`/cars/${id}`),
  updateCar: (id, carData) => api.put(`/cars/${id}`, carData),
  deleteCar: (id) => api.delete(`/cars/${id}`),
};
