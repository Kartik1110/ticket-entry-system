import axios, { AxiosResponse } from "axios";
import { API_URL } from "../shared/apiEndPointURL";
import { AgentInterface, AxiosResponseInterface } from "../interfaces";

export const agentService = async (requestBody: AgentInterface): Promise<AxiosResponse<AxiosResponseInterface>> => {
  const result = await axios
    .post(API_URL.createAgent, requestBody)
    .then((response) => response)
    .catch((error) => {
      if (error.response.data.message) throw new Error(error.response.data.message);
      else throw new Error("Something went wrong!");
    });

  return result;
};
