import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/migration';

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