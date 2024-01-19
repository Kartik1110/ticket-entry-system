import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import * as fs from "fs";
import { ticketSchema } from "../schemas";

const ticketsRouter = Router();
const prisma = new PrismaClient();

const FILE_PATH = "./src/constants/agents.txt";

ticketsRouter.post("/support-ticket", async (req: Request, res: Response) => {
  try {
    const parsedData = ticketSchema.parse(req.body);

    const { type, description, severity, status, topic } = parsedData;

    try {
      const lastIndexData = fs.readFileSync(FILE_PATH, "utf8");
      const nextAgentIndex = (1 + parseInt(lastIndexData)) % (await prisma.agent.count());
      const agents = await prisma.agent.findMany();

      fs.writeFileSync(FILE_PATH, nextAgentIndex.toString(), "utf8");

      await prisma.ticket.create({
        data: {
          type,
          assignedTo: nextAgentIndex === -1 ? agents[0].name : agents[nextAgentIndex].name,
          description,
          resolvedOn: new Date(),
          severity,
          status,
          topic,
        },
      });

      res.status(201).json({ message: "Ticket created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

ticketsRouter.get("/support-tickets", async (req: Request, res: Response) => {
  const { page, pageSize } = req.query;

  const tickets = await prisma.ticket.findMany();
  if (tickets && tickets.length > 0) {
    res.status(201).json({ message: "Tickets found", data: tickets });
  } else {
    res.status(404).json({ message: "No tickets found" });
  }
});

export default ticketsRouter;
