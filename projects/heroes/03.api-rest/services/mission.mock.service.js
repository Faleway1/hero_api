import { missionsMocks } from "../mocks/mission.mock.js";
import { MissionService } from "./index.service.js";

export async function initializeMissionMock() {
  console.log("========== START MISSION MOCKING ==========");
  for (const mission of missionsMocks) {
    console.log(mission)
    try {
      const newMission = await MissionService.createMission(mission);
      console.log(newMission);
    } catch (error) {
      console.log("[ERROR]", error.message);
    }
  }
  console.log("========== ENDING MISSION MOCKING ==========");
  // return await MissionService.getAllMission();
}
