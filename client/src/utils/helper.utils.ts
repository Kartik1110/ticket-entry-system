import { SeverityEnum } from "../interfaces";

const colors: { [key: string]: string } = {
  LOW: "text-green-500",
  MEDIUM: "text-yellow-500",
  HIGH: "text-red-500",
};

/* This function is used to generate classname for the difficuty column in problemsList page */
export const getColorClass = (data: SeverityEnum): string => {
  return colors[data.toUpperCase()] || "";
};
