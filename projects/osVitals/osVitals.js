import os from "os";
import si from "systeminformation";

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours}h ${minutes}m ${secs}s`;
}

const vitals = {
  OS_Type: os.type(),
  OS_Release: os.release(),
  Hostname: os.hostname(),
  Total_Memory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
  Free_Memory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
  Used_Memory: `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(
    2
  )} GB`,
  CPU_Architecture: os.arch(),
  CPU_Cores: os.cpus().length,
  CPU_Model: os.cpus()[0].model,
  Uptime: formatUptime(os.uptime()),
};

console.log("--- OS Vitals ---");
for (const [key, value] of Object.entries(vitals)) {
  console.log(`${key}: ${value}`);
}

async function getGraphicsInfo() {
  try {
    const graphics = await si.graphics();
    console.log("--- GPU Information ---");
    graphics.controllers.forEach((gpu, index) => {
      console.log(`GPU ${index + 1}:`);
      console.log(`  Model: ${gpu.model}`);
      console.log(`  Vendor: ${gpu.vendor}`);
      console.log(`  VRAM: ${gpu.vram} MB`);
      console.log(`  Bus: ${gpu.bus}`);
    });
  } catch (error) {
    console.error("Error retrieving GPU information:", error);
  }
}

getGraphicsInfo();