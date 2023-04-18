import express from "express";
import { json, urlencoded } from "express";
import { peopleRouter } from "./Routes/people.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "app")));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/people", peopleRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
