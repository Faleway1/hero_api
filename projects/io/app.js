import fs from "node:fs/promises";

function getFormattedDate() {
  const now = new Date();
  return now.toISOString().replace(/[-:T]/g, "_").split(".")[0];
}

async function getRandomUser() {
  const r = await fetch("https://randomuser.me/api");
  if (r.status !== 200) {
    return
  }
  const j = await r.json();
  return JSON.stringify(j.results[0], null, 2);
}

async function writeRandomUser(i=0) {
  const path = "./randomUser";
  await fs.access(path).catch(() => {
    fs.mkdir(path, { recursive: true });
  });
  const data = await getRandomUser();
  if (!data) {
    return;
  }
  await fs.writeFile(`${path}/${getFormattedDate()}${i}.json`, data);
}

for (let i = 0; i < 10; i++){
  writeRandomUser(i);
}
