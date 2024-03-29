const baseURL = import.meta.env.VITE_API_BASE_URL;

export const API_URL = {
  baseUrl: baseURL || "",
  createAgent: baseURL ? `${baseURL}/support-agents` : "",
  createTicket: baseURL ? `${baseURL}/support-ticket` : "",
  getTickets: baseURL ? `${baseURL}/support-tickets` : "",
};
