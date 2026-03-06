import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { userRoutes } from "./modules/users/user.route";

const app = express();

// Middleware globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Doit toujours être en DERNIER
app.use(errorHandler);

export default app;
