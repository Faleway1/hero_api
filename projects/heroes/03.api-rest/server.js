import cors from "cors";
import sequelize from "./config/database.js";
import express from "express";
import heroRouter from "./routers/hero.router.js";
import powerRouter from "./routers/power.router.js";
import { logMiddleware } from "./middlewares/log.middleware.js";

import { initializeHeroMock } from "./services/hero.mock.service.js";
import { initializePowerMock } from "./services/power.mock.service.js";
import { initializeMissionMock } from "./services/mission.mock.service.js";
import { errorHandler } from "./middlewares/error.middleware.js";

await sequelize.sync({ force: true });
console.log("Base de donnée synchronisée !");

await initializeHeroMock();
await initializePowerMock();
await initializeMissionMock();

const app = express();

app.use(cors())
app.use(express.json());
app.use(logMiddleware);

app.use("/api/v1/heroes/", heroRouter);
app.use("/api/v1/powers/", powerRouter);
app.use("/api/v1/missions/", powerRouter);

app.use(errorHandler)

app.listen(3000, () => console.log("Server listen on http://localhost:3000"));
