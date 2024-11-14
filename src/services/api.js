import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',  // adjust to your FastAPI backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) =>
    api.post('/token', new URLSearchParams({ username: email, password })),
  register: (userData) => api.post('/register', userData),
};

export const carService = {
  createCar: (carData) => {
    const formData = new FormData();
    Object.keys(carData).forEach(key => {
      if (key === 'images') {
        carData.images.forEach(image => formData.append('images', image));
      } else {
        formData.append(key, carData[key]);
      }
    });
    return api.post('/cars/', formData);
  },
  getCars: (search) => api.get('/cars/', { params: { search } }),
  getCar: (id) => api.get(`/cars/${id}`),
  updateCar: (id, carData) => api.put(`/cars/${id}`, carData),
  deleteCar: (id) => api.delete(`/cars/${id}`),
};
