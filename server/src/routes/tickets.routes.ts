import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import * as fs from "fs";
import { ticketSchema } from "../schemas";

const ticketsRouter = Router();
const prisma = new PrismaClient();

const FILE_PATH = "./src/constants/agents.txt";

/* Create a new ticket */
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

/* Get Tickets - using pagination, filter and sort */
ticketsRouter.get("/support-tickets", async (req: Request, res: Response) => {
  const { page, pageSize } = req.query;

  if (page && pageSize && Number(pageSize) > 0) {
    let queryOptions = {
      skip: Number(page) * Number(pageSize),
      take: Number(pageSize),
    };
    /* If page is 0 then skip will be 0, this is because DataGrid sets 1st page as 0 */
    if (page && Number(page) === 0 && pageSize && Number(pageSize) > 0) {
      queryOptions = {
        skip: 0,
        take: Number(pageSize),
      };
    }
    try {
      const ticketsCount = await prisma.ticket.count();

      const tickets = await prisma.ticket.findMany(queryOptions);
      if (tickets && tickets.length > 0) {
        res
          .status(200)
          .json({ message: "Tickets found", data: tickets, totalRowCount: ticketsCount });
      } else {
        res.status(404).json({ message: "No tickets found" });
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Invalid page or pageSize parameters" });
  }
});

export default ticketsRouter;
