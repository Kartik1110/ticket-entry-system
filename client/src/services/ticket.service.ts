import axios, { AxiosResponse } from "axios";
import { API_URL } from "../shared/apiEndPointURL";
import { AxiosResponseInterface, PageInfoInterface, TicketInterface } from "../interfaces";

export const createTicketService = async (
  requestBody: TicketInterface
): Promise<AxiosResponse<AxiosResponseInterface>> => {
  const result = await axios
    .post(API_URL.createTicket, requestBody)
    .then((response) => response)
    .catch((error) => {
      if (error.response.data.message) throw new Error(error.response.data.message);
      else throw new Error("Something went wrong!");
    });

  return result;
};

export const getTicketsService = async (params: PageInfoInterface): Promise<AxiosResponse<AxiosResponseInterface>> => {
  const result = await axios
    .get(API_URL.getTickets, { params })
    .then((response) => response)
    .catch((error) => {
      if (error.response.data.message) throw new Error(error.response.data.message);
      else throw new Error("Something went wrong!");
    });

  return result;
};
