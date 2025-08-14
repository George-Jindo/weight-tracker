import axios from 'axios';

// Base URL of the API. Uses an environment variable if defined.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getWeightEntries = () => {
  return axios.get(`${API_BASE_URL}/WeightEntries`);
};

export const createWeightEntry = (entry) => {
  return axios.post(`${API_BASE_URL}/WeightEntries`, entry);
};

export const updateWeightEntry = (id, entry) => {
  return axios.put(`${API_BASE_URL}/WeightEntries/${id}`, entry);
};

export const deleteWeightEntry = (id) => {
  return axios.delete(`${API_BASE_URL}/WeightEntries/${id}`);
};