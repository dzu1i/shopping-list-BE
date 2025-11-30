import { Router } from "express";
import { auth } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";
import { validate } from "../middleware/validate";
import { shoppingListMemberController } from "../controllers/shoppingListMemberController";

const router = Router();

router.use(auth);

router.get(
  "/shoppingListMember/list",
  requireRole(["owner", "member"]),
  validate("shoppingListMember/list"),
  shoppingListMemberController.list
);

export default router;
