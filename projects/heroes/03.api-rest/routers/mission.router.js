import express from "express";
import { MissionController } from "../controllers/index.controller.js";

const missionRouter = express.Router()

missionRouter.get("/", MissionController.getAllMission);
missionRouter.get("/:id", MissionController.getMissionById);
missionRouter.post("/", MissionController.createMission);
missionRouter.put("/:id", MissionController.updateMission);
missionRouter.delete("/:id", MissionController.deleteMission);

missionRouter.patch("/:id/restore", MissionController.restoreMission)

export default missionRouter;