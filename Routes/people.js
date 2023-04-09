import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const dataPath = join(process.cwd(), "app/data.json");

const peopleRouter = Router();

peopleRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const database = await readFile(dataPath, "utf-8");
    const data = JSON.parse(database);
    data.peoples.push(body);
    const pushdata = JSON.stringify(data);
    await writeFile(dataPath, pushdata);
    console.log("Data written to file");
    res.status(201).json({ message: "Complete" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

peopleRouter.delete("/", async (req, res) => {
  try {
    const body = req.body;
    const database = await readFile(dataPath, "utf-8");
    const data = JSON.parse(database);
    const peoples = data.peoples;
    const index = peoples.findIndex((obj) => obj.id === body.id);
    if (index > -1) {
      peoples.splice(index, 1);
      const pushdata = JSON.stringify(data);
      await writeFile(dataPath, pushdata);
      console.log("Data deleted");
      res.status(200).json({ message: "Complete" });
    } else {
      console.log("Not found");
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export { peopleRouter };
