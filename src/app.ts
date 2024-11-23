import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./app/modules/auth/auth.route";
import { bookRoutes } from "./app/modules/Book/book.route";
import { authorRoutes } from "./app/modules/author/author.route";
import { categoryRoutes } from "./app/modules/category/category.route";
import authMiddleware from "./app/middleware/auth";
import { profileRoutes } from "./app/modules/profile/profile.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notfound from "./app/middleware/notFound";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/author", authorRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/books", authMiddleware, bookRoutes);
app.use("/api/v1/profile", authMiddleware, profileRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "The server is running",
  });
});

app.use(globalErrorHandler);
app.use(notfound);

export default app;

// *pF?+J5amU_R7pr
