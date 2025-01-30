import express from "express";
import { addHeroes, renderHeroesList, renderHome } from "./controller/hero.controller.js";

const router = express.Router()

router.get("/", renderHome);
router.get("/heroes", renderHeroesList);
router.post("/heroes", addHeroes);

export default router;