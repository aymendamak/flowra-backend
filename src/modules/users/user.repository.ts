import { prisma } from "../../config/database";
import { User, CreateUserDto } from "./user.types";

export const userRepository = {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        passwordHash: false,
      },
    });
  },

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async create(data: CreateUserDto): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash: data.password,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        passwordHash: false,
      },
    });
  },
};
