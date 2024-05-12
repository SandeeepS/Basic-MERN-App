import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
const port = process.env.PORT || 5000;
const app = express();
app.use(express());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
connectDb();

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Server is working"));
app.listen(port, () => console.log(`server started on port ${port}`));
