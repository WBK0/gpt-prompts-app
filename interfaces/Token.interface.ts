import { JWT } from "next-auth/jwt";

export interface Token extends JWT{
  id: string;
}