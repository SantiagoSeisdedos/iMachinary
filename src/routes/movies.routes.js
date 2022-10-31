import { Router } from "express";
import { createMovie, deleteMovie, getMovie, getMovies, updateMovie, getMoviePersons } from "../controllers/movie.controller.js";

const router = Router();

// Routes
router.post("/", createMovie);
router.get("/", getMovies);
router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

router.get("/:id/persons", getMoviePersons);

export default router;
