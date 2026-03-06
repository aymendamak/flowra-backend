import { AppError } from "../../middleware/errorHandler";
import { userRepository } from "./user.repository";
import { CreateUserDto } from "./user.types";

export const getAllUsersService = async () => {
  return await userRepository.findAll();
};

export const getUserByIdService = async (id: number) => {
  return await userRepository.findById(id);
};

export const createNewUserService = async (user: CreateUserDto) => {
  const exists = await userRepository.findByEmail(user.email);

  if (exists != null) {
    const error: AppError = new Error("Email already in use");
    error.statusCode = 400;
    throw error;
  }

  return userRepository.create(user);
};
