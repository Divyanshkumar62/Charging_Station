import express from "express";
import {
  createStation,
  deleteStation,
  getStations,
  updateStation,
} from "../controllers/station.controller.js";
import { verified } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verified, getStations);
router.post("/", verified, createStation);
router.put("/:id", verified, updateStation);
router.delete("/:id", verified, deleteStation);

export default router;
