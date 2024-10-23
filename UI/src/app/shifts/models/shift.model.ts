import { Role } from "./role.enum";

export interface Shift {
    id: number;
    name: string;
    dateTime: Date;
    role: Role;
    userId?: number;
  }