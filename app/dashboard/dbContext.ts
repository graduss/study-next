import { PrismaClient } from "@prisma/client";
import { createContext } from "react";

export const prismaClient = new PrismaClient;

export const DbContext = createContext<PrismaClient>(prismaClient);