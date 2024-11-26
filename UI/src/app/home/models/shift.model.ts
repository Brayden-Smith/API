import { Role } from "./role.enum";

export interface Shift {
    id: number;
    name: string;
    dateTime: Date;
    role: Role;
    username?: string | null;
    fullName?: string;
  }
