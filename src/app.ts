import express, { Request, Response } from "express";
import { env } from "./config/env";
const app = express();

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

export default app;
