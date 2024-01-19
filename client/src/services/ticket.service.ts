import axios, { AxiosResponse } from "axios";
import { API_URL } from "../shared/apiEndPointURL";
import { AxiosResponseInterface, TicketInterface } from "../interfaces";

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
