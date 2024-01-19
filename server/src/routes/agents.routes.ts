import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { agentSchema } from "../schemas";

const agentsRouter = Router();
const prisma = new PrismaClient();

agentsRouter.post("/support-agents", async (req: Request, res: Response) => {
  try {
    const parsedData = agentSchema.parse(req.body);
    const { name, email, phone, active, description } = parsedData;

    const agentFound = await prisma.agent.findUnique({
      where: {
        name,
      },
    });

    if (agentFound) {
      res.status(403).json({ message: "Agent with this name already exists" });
    } else {
      await prisma.agent.create({
        data: { name, email, phone, active, description },
      });
      res.status(201).json({ message: "Agent created successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

export default agentsRouter;
