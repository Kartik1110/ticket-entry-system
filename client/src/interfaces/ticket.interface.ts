export interface TicketInterface {
  topic: string;
  description: string;
  type: string;
  severity: string;
  status: string;
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
