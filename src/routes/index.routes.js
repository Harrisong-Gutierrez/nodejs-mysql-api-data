import { Router } from "express";
import { http } from "../controllers/index.controller.js";

const router = Router();

router.get("/ping", http);

export default router;
