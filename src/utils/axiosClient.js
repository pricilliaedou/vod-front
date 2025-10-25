import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Intercepteur de réponse (optionnel, utile pour les erreurs globales)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Exemple : redirection si token expiré
    if (error.response && error.response.status === 401) {
      console.warn("Token invalide ou expiré.");
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

export default api;
