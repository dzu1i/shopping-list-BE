import { Router } from "express";
import { auth } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";
import { validate } from "../middleware/validate";
import { shoppingListController } from "../controllers/shoppingListController";

const router = Router();

router.use(auth);

router.post(
  "/shoppingList/create",
  requireRole(["owner"]),
  validate("shoppingList/create"),
  shoppingListController.create
);

router.get(
  "/shoppingList/get",
  requireRole(["owner", "member"]),
  validate("shoppingList/get"),
  shoppingListController.get
);

router.get(
  "/shoppingList/list",
  requireRole(["owner", "member"]),
  shoppingListController.list
);

export default router;
