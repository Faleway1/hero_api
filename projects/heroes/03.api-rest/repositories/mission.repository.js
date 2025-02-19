import Mission from "../models/mission.model.js";

export async function createMission({ missionName, missionDesc, missionDifficulty, id_hero }) {
  const Mission = await Mission.create({ missionName, missionDesc, missionDifficulty, id_hero });
  return Mission;
}

export async function getMissionById(id) {
  const Mission = await Mission.findByPk(id);
  if (!Mission) {
    return null;
  }

  return Mission;
}

export async function getDeletedMissionById(id) {
  const Mission = await Mission.scope("deleted").findByPk(id);
  if (!Mission) {
    return null;
  }

  return Mission;
}

export async function updateMission(id, values) {
  const Mission = await getMissionById(id);
  if (!Mission) {
    return null;
  }

  return await Mission.update(values);
}

export async function deleteMission(id) {
  const Mission = await getMissionById(id);
  if (!Mission) {
    return null;
  }

  return await updateMission(Mission.id, { isDeleted: true });
}

export async function getAllMission() {
  return await Mission.findAll();
}

export async function missionExists(missionName) {
  const Mission = await Mission.findOne({ where: { missionName } });
  return Boolean(Mission);
}

export async function missionDeletedExists(missionName) {
  const Mission = await Mission.scope("deleted").findOne({ where: { missionName } });
  return Boolean(Mission);
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
