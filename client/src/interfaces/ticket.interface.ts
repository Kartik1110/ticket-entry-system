import { GridColDef } from "@mui/x-data-grid";

export interface TicketInterface {
  topic: string;
  description: string;
  type: string;
  severity: string;
  status: string;
}

export interface PageInfoInterface {
  page: number;
  pageSize: number;
}

export interface TicketsTableDataInterface {
  columns: GridColDef[];
  rows: {
    [key: string]: string;
  }[];
}

export enum StatusEnum {
  NEW = "NEW",
  ASSIGNED = "ASSIGNED",
  RESOLVED = "RESOLVED",
}

export enum SeverityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
