import { Request, Response, NextFunction } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  createNewUserService,
} from "./user.service";
import { CreateUserDto } from "./user.types";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const usersList = await getAllUsersService();
    res.status(200).json(usersList);
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user id" });
      return;
    }

    const user = await getUserByIdService(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userData: CreateUserDto = req.body;
    const newUser = await createNewUserService(userData);
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
};
