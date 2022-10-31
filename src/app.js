import express from "express";
import morgan from "morgan";

const app = express();

// Import routes
import personRoutes from "./routes/persons.routes.js";
import movieRoute from "./routes/movies.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/persons", personRoutes);
app.use("/api/movies", movieRoute );

export default app;
