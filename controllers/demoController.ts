import { Request, Response, Router } from "express";
import client from "../db/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

export default router;
