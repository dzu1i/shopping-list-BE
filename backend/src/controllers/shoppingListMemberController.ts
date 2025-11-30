import { Request, Response } from "express";

export const shoppingListMemberController = {
  list(req: Request, res: Response) {
    const dtoIn = (req as any).dtoIn;

    const dtoOut = {
      listId: dtoIn.listId,
      members: [
        { userId: "mock-owner", role: "owner" },
        { userId: "mock-member", role: "member" }
      ]
    };

    res.json(dtoOut);
  }
};
