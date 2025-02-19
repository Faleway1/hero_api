import {
    ConflictError,
    BadRequestError,
    NotFoundError,
  } from "../errors/api.error.js";
  import { MissionRepository } from "../repositories/index.repository.js";
  
  export async function getMissionById(id) {
    const mission = await MissionRepository.getMissionById(id);
  
    if (!mission) {
      throw new NotFoundError("La mission n'existe pas.");
    }
  
    return {
      id: mission.id,
      missionName: mission.missionName,
      missionDesc: mission.missionDesc,
      missionDifficulty: mission.missionDifficulty,
      id_hero: mission.id_hero
    };
  }
  
  export async function createMission({ missionName, missionDesc, missionDifficulty, id_hero }) {
    if (!missionName || !missionDesc || !missionDifficulty || !/^[a-zA-Z ]+$/.test(missionName) || !/^[EDCBAS ]+$/.test(missionDifficulty)) {
      throw new BadRequestError("Mission non valide");
    }
  
    if (await MissionRepository.missionExists(missionName)) {
      throw new ConflictError("La mission existe déjà.");
    }
  
    const mission = await MissionRepository.createMission({ missionName, missionDesc, missionDifficulty, id_hero });
  
    return mission.dataValues;
  }
  
  export async function updateMission(id, { missionName, missionDesc, missionDifficulty, id_hero }) {
    if (!missionName || !missionDesc || !missionDifficulty || !/^[a-zA-Z ]+$/.test(missionName) || !/^[EDCBAS ]+$/.test(missionDifficulty)) {
        throw new BadRequestError("Mission non valide");
      }
    
    if (await MissionRepository.missionExists(missionName)) {
      throw new ConflictError("La mission existe déjà.");
    }
  
    if (!await MissionRepository.getMissionById(id)) {
      throw new NotFoundError("La mission n'existe pas, id:");
    }
  
    const mission = await MissionRepository.updateMission(id, {
      missionName,
      missionDesc,
      missionDifficulty,
      id_hero,
    });
  
    return mission.dataValues;
  }
  
  export async function deletemission(id) {
    if (!(await getMissionById(id))) {
      throw new NotFoundError("La mission n'existe pas.");
    }
  
    return await MissionRepository.deleteMission(id);
  }
  
  export async function getAllMission() {
    const allMission = await MissionRepository.getAllMission();
  
    const formattedMission = allMission.map((mission) => {
      return {
        id: mission.id,
        missionName: mission.missionName,
        missionDesc: mission.missionDesc,
        missionDifficulty: mission.missionDifficulty,
        id_hero: mission.id_hero
      };
    });
  
    return formattedMission;
  }
  
  export async function restoredMission(id) {
    const restoredMission = await MissionRepository.restoredMission(id);
  
    if (!restoredMission) {
      throw new NotFoundError(
        "La mission n'existe pas. La mission ne peut pas être restauré."
      );
    }
  
    if (await MissionRepository.missionExists(restoredMission.missionName)) {
      throw new ConflictError("La mission existe déjà. La mission ne peut pas être restauré.")
    }
  
    return restoredMission;
  }
  