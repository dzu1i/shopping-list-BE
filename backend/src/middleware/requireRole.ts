import { Request, Response, NextFunction } from "express";
import { UserProfile } from "./auth";

export function requireRole(allowed: UserProfile[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowed.includes(req.user.profile)) {
      return res.status(403).json({
        error: "Not authorized",
        allowedProfiles: allowed,
        currentProfile: req.user?.profile
      });
    }
    next();
  };
}
