import { Router } from "express";
import { auth } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";
import { validate } from "../middleware/validate";
import { shoppingItemController } from "../controllers/shoppingItemController";

const router = Router();

router.use(auth);

router.get(
  "/shoppingItem/list",
  requireRole(["owner", "member"]),
  validate("shoppingListMember/list"),
  shoppingItemController.list
);

router.post(
  "/shoppingItem/create",
  requireRole(["owner", "member"]),
  validate("shoppingItem/create"),
  shoppingItemController.create
);

router.post(
  "/shoppingItem/update",
  requireRole(["owner", "member"]),
  validate("shoppingItem/update"),
  shoppingItemController.update
);

export default router;
