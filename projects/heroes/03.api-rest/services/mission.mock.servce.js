import { missionsMocks } from "../mocks/mission.mock.js";
import { MissionService } from "./index.service.js";

export async function initializeMissonMock() {
  console.log("========== START MISSION MOCKING ==========");
  for (const mission of missionsMocks) {
    try {
      const newMission = await MissionService.createMission(mission);
      console.log(newMission);
    } catch (error) {
      console.log("[ERROR]", error.message);
    }
  }
  console.log("========== ENDING MISSION MOCKING ==========");
  return await MissionService.getAllMissiones();
}
