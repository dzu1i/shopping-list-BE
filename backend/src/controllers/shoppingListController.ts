import { Request, Response } from "express";

export const shoppingListController = {
  create(req: Request, res: Response) {
    const dtoIn = (req as any).dtoIn;

    const dtoOut = {
      id: "mock-list-id",
      name: dtoIn.name,
      description: dtoIn.description ?? "",
      ownerId: req.user!.id,
      state: "active" as const
    };

    res.json(dtoOut);
  },

  get(req: Request, res: Response) {
    const dtoIn = (req as any).dtoIn;

    const dtoOut = {
      id: dtoIn.id,
      name: "Mock list",
      description: "This is just a placeholder",
      ownerId: "mock-owner",
      state: "active" as const,
      members: [
        { userId: "mock-owner", role: "owner" },
        { userId: "mock-member", role: "member" }
      ],
      items: [
        { id: "item-1", name: "Milk", quantity: "2x", isResolved: false }
      ]
    };

    res.json(dtoOut);
  },

  list(_req: Request, res: Response) {
    const dtoOut = {
      itemList: [
        {
          id: "mock-list-id",
          name: "Groceries",
          state: "active" as const,
          role: "owner" as const
        }
      ]
    };

    res.json(dtoOut);
  }
};
