import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const agentsRouter = Router();
const prisma = new PrismaClient();

agentsRouter.post("/support-agents", async (req: Request, res: Response) => {
  const { name, email, phone, active, description } = req.body;

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

    const agents = await prisma.agent.findMany();
    console.log("🚀 ~ app.get ~ agents:", agents);

    res.status(201).json({ message: "Agent created successfully" });
  }
});

export default agentsRouter;
