import express from "express";
import router from "./routes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.ip === "::ffff:127.0.0.1") {
    next();
  }
});

app.use(express.static("./public"));

app.use("/", router);

app.listen(8000, () => {
  console.log(`>>>:Started server on http://localhost:8000`);
});
