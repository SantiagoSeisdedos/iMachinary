import { Router } from "express";
import { getPersons, getPerson, createPerson, updatePerson, deletePerson, getPersonMovies } from "../controllers/person.controller.js";

const router = Router();

// Routes
router.post("/", createPerson);
router.get("/", getPersons);
router.get("/:id", getPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

router.get("/:id/movies", getPersonMovies);

export default router;
