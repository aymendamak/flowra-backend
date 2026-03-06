import { Router } from "express";
import { getAllUsers, getUserById, createNewUser } from "./user.controller";

export const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.post("/", createNewUser);
