import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { userRoutes } from "./modules/users/user.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
