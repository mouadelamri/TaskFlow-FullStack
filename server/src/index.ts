import express, { type Request, type Response } from "express";
import cors from "cors"; // <--- Mohim bzaf
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Hada howa sster li kayhall l-mochkil
app.use(cors()); 

app.use(express.json());

// Routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server is running smoothly!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});