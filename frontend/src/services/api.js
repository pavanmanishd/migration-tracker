import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ? 
  `${import.meta.env.VITE_API_URL}/api/migration` : 
  'http://localhost:8080/api/migration';

const APPLICATIONS_API_URL = import.meta.env.VITE_API_URL ? 
  `${import.meta.env.VITE_API_URL}/api/applications` : 
  'http://localhost:8080/api/applications';

// Configure axios to use auth token when available
const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
};

// Execute the interceptor setup
setupAxiosInterceptors();

export const getAllEaiCodes = async () => {
  const response = await axios.get(`${API_BASE_URL}/eaicodes`);
  return response.data;
};

export const getApplicationDetails = async (eaiCode) => {
  const response = await axios.get(`${API_BASE_URL}/${eaiCode}`);
  return response.data;
};

export const initializeApplication = async (eaiCode, username) => {
  const response = await axios.post(
    `${API_BASE_URL}/initialize?eaiCode=${eaiCode}&username=${username}`
  );
  return response.data;
};

export const updateMigrationItem = async (id, itemData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, itemData);
  return response.data;
};

export const getAllApplications = async () => {
  const response = await axios.get(APPLICATIONS_API_URL);
  return response.data;
};

export const getApplicationByEaiCode = async (eaiCode) => {
  const response = await axios.get(`${APPLICATIONS_API_URL}/${eaiCode}`);
  return response.data;
};

export const addApplication = async (applicationData) => {
  const response = await axios.post(APPLICATIONS_API_URL, applicationData);
  return response.data;
};

export const updateApplication = async (id, applicationData) => {
  const response = await axios.put(`${APPLICATIONS_API_URL}/${id}`, applicationData);
  return response.data;
};