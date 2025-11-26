import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_SERVER_ADRESS = import.meta.env.VITE_API_SERVER;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

const fivemRequest = axios.create({
  baseURL: API_SERVER_ADRESS,
  headers: {},
});

export { api, fivemRequest };
