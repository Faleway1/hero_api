import { powersMocks } from "../mocks/powers.mock.js";
import { PowerService } from "./index.service.js";

export async function initializePowerMock() {
  console.log("========== START POWER MOCKING ==========");
  for (const power of powersMocks) {
    try {
      const newPower = await PowerService.createPower(power);
      console.log(newPower);
    } catch (error) {
      console.log("[ERROR]", error.message);
    }
  }
  console.log("========== ENDING POWER MOCKING ==========");
  return await PowerService.getAllPowers();
}