import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./controllers/demoController";
import client from "./db/db";
import restaurantRoutes from "./routes/restaurantRoutes";
import ratingsRoutes from "./routes/ratingsRoutes";
import orderRoutes from "./routes/orderRoutes";
import dishesRoutes from "./routes/dishesRoutes";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use("/", routes);
app.use("/restaurants", restaurantRoutes);
app.use("/ratings", ratingsRoutes)
app.use("/order", orderRoutes)
app.use("/dishes", dishesRoutes)

app.listen(port, () => {
  console.log(`Server is On at http://localhost:${port}`);
});

process.on("SIGINT", () => {
  client.end((err: Error) => {
    if (err) {
      console.error("error during disconnection", err.stack);
    }
    process.exit();
  });
});

process.on("SIGTERM", () => {
  client.end((err: Error) => {
    if (err) {
      console.error("error during disconnection", err.stack);
    }
    process.exit();
  });
});
