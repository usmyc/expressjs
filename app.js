import express from "express";
import { json, urlencoded } from "express";
import { peopleRouter } from "./Routes/people.js";

const app = express();
const port = 3000;

app.use(express.static("app"));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/people", peopleRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
