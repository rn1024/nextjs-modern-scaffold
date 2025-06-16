import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import { Role, Plan, Status } from './index';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
      plan: Plan;
      status: Status;
      emailVerified?: Date | null;
      createdAt: Date;
      lastLoginAt?: Date | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: Role;
    plan: Plan;
    status: Status;
    emailVerified?: Date | null;
    createdAt: Date;
    lastLoginAt?: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    plan: Plan;
    status: Status;
    emailVerified?: Date | null;
    createdAt: Date;
    lastLoginAt?: Date | null;
  }
}