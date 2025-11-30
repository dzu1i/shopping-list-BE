import express from "express";
import shoppingListRoutes from "./routes/shoppingListRoutes";
import shoppingItemRoutes from "./routes/shoppingItemRoutes";
import shoppingListMemberRoutes from "./routes/shoppingListMemberRoutes";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-user-id, x-profile");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(shoppingListRoutes);
app.use(shoppingItemRoutes);
app.use(shoppingListMemberRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
