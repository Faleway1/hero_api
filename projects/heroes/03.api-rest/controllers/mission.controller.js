import { MissionService } from "../services/index.service.js";

export async function getAllMission(req, res, next) {
  try {
    const allMission = await MissionService.getAllMission();
    res.json(allMission);
  } catch (error) {
    next(error)
  }
}

export async function getMissionById(req, res, next) {
  try {
    const id = req.params.id;
    const mission = await MissionService.getMissionById(id);
    res.json(mission);
  } catch (error) {
    next(error)
  }
}

export async function createMission(req, res, error) {
  try {
    const { missionName, missionDesc, missionDifficulty, id_hero } = req.body;
    const newMission = await MissionService.createMission({
      missionName,
      missionDesc,
      missionDifficulty,
      id_hero,
    });
    res.json(newMission);
  } catch (error) {
    next(error)
  }
}

export async function updateMission(req, res, next) {
  try {
    const id = req.params.id;
    const { missionName, missionDesc, missionDifficulty, id_hero } = req.body;
    const updatedMission = await MissionService.updateMission(id, {
      missionName,
      missionDesc,
      missionDifficulty,
      id_hero,
    });
    res.json(updatedMission);
  } catch (error) {
    next(error)
  }
}

export async function deleteMission(req, res, next) {
  try {
    const id = req.params.id;
    const deletedMission = await MissionService.deleteMission(id);
    res.json(deletedMission);
  } catch (error) {
    next(error)
  }
}

export async function restoreMission(req, res, next) {
  try {
    const id = req.params.id;
    const restoredMission = await MissionService.restoreMission(id);
    res.json(restoredMission);
  } catch (error) {
    next(error)
  }
}