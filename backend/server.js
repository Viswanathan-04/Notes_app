import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/router.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT_NO | 5000;

app.use('/api/notes', router);

app.listen(port, () => {
    console.log("Listening on port "+port);
    connectDB();
})