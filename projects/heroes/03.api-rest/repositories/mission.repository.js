import Mission from "../models/mission.model.js";

export async function createMission({ missionName, missionDesc, missionDifficulty, id_hero }) {
  const mission = await Mission.create({ missionName, missionDesc, missionDifficulty, id_hero });
  return mission;
}

export async function getMissionById(id) {
  const mission = await Mission.findByPk(id);
  if (!mission) {
    return null;
  }

  return mission;
}

export async function getDeletedMissionById(id) {
  const mission = await Mission.scope("deleted").findByPk(id);
  if (!mission) {
    return null;
  }

  return mission;
}

export async function updateMission(id, values) {
  const mission = await getMissionById(id);
  if (!mission) {
    return null;
  }

  return await mission.update(values);
}

export async function deleteMission(id) {
  const mission = await getMissionById(id);
  if (!mission) {
    return null;
  }

  return await updateMission(mission.id, { isDeleted: true });
}

export async function getAllMission() {
  return await Mission.findAll();
}

export async function missionExists(missionName) {
  const mission = await Mission.findOne({ where: { missionName } });
  return Boolean(mission);
}

export async function missionDeletedExists(missionName) {
  const mission = await Mission.scope("deleted").findOne({ where: { missionName } });
  return Boolean(mission);
}

export async function getAllMissionsWithDeleted() {
  await Mission.scope("withDeleted").findAll();
}

export async function getAllMissionsDeleted() {
  await Mission.scope("deleted").findAll();
}

export async function restoreMission(id) {
  const deletedMission = await getDeletedMissionById(id);  

  if (!deletedMission) {
    return null;
  }

  return await deletedMission.update({ isDeleted: false });
}
