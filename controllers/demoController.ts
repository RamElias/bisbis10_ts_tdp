import { Request, Response, Router } from "express";
import client from "../db/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log("i am here")
  res.send("Welcome to Express & TypeScript Server");
  try {
    const result = await client.query('SELECT * FROM restaurants WHERE is_kosher = true');
    //console.log('SQL Query:', queryString);
     console.log('Result:', result);
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching restaurants: ${error}`);
  }
});

export default router;
