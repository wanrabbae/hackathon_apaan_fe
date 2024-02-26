import Axios from 'axios';

// const token = localStorage.getItem('token');
// const token = "3|nq3Ou9hfMp18W7Jtv27Lzik9a8zFtHcSWGMGn3yL";
const token = "9|9zZNFX6dmgHRUJWovhMErs9mWGUfxlWC82SbsIOd";

const api = Axios.create({
  // baseURL: 'https://apaan-be.000webhostapp.com/api',
  baseURL: 'http://localhost:8000/api',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;