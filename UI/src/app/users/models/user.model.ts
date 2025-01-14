import {Role} from './role.enum';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: Role;
  }
