import express, { Express, Router } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import agentsRouter from "./routes/agents.routes";
import ticketsRouter from "./routes/tickets.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

const mainRouter: Router = Router();
mainRouter.use("/", agentsRouter);
mainRouter.use("/", ticketsRouter);

app.use("/api", mainRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}/api`);
});
