import { Request, Response, NextFunction } from "express";

export type UserProfile = "owner" | "member";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        profile: UserProfile;
      };
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const userId = req.header("x-user-id") || "mock-user-id";
  const profile = (req.header("x-profile") as UserProfile) || "owner";

  req.user = { id: userId, profile };
  next();
}
