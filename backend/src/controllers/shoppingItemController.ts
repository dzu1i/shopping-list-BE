import { Request, Response } from "express";

export const shoppingItemController = {
  list(req: Request, res: Response) {
    const dtoIn = (req as any).dtoIn;

    const dtoOut = {
      listId: dtoIn.listId,
      itemList: [
        { id: "item-1", name: "Milk", quantity: "2x", isResolved: false },
        { id: "item-2", name: "Bread", quantity: "1x", isResolved: true }
      ]
    };

    res.json(dtoOut);
  },

  create(req: Request, res: Response) {
    const dtoIn = (req as any).dtoIn;

    const dtoOut = {
      id: "mock-item-id",
      listId: dtoIn.listId,
      name: dtoIn.name,
      quantity: dtoIn.quantity ?? "",
      isResolved: false
    };

    res.json(dtoOut);
  },

  update(req: Request, res: Response) {
    const dtoIn = (req as any).dtoIn;

    const dtoOut = {
      id: dtoIn.itemId,
      listId: dtoIn.listId,
      name: dtoIn.name ?? "Existing name",
      quantity: dtoIn.quantity ?? "Existing quantity",
      isResolved: false
    };

    res.json(dtoOut);
  }
};
