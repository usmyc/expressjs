import express from "express";
import bodyParser from "body-parser"; // body parser
import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(express.static("app"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.post("/", (req, res) => {
  const body = req.body;
  fs.readFile("./app/data.json", "utf-8", (err, database) => {
    if (err) {
      console.error(err);
    }
    const data = JSON.parse(database);
    data.peoples.push(body);
    const pushdata = JSON.stringify(data);
    fs.writeFile("./app/data.json", pushdata, (err) => {
      if (err) {
        console.error(err);
      }
      console.log("Data written to file");
    });
    res.send("Complete");
  });
});

app.delete("/", (req, res) => {
  const body = req.body;
  fs.readFile("./app/data.json", "utf-8", (err, database) => {
    if (err) {
      console.error(err);
    }
    const data = JSON.parse(database);
    const peoples = data.peoples;
    const deleteObj = peoples.find((obj) => obj.id === body.id);
    const index = peoples.indexOf(deleteObj);
    if (index > -1) {
      peoples.splice(index, 1);
    } else {
      console.log("Not found");
    }
    const pushdata = JSON.stringify(data);
    fs.writeFile("./app/data.json", pushdata, (err) => {
      if (err) {
        console.error(err);
      }
      console.log("Data deleted");
    });
    res.send("Complete");
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// app.get("/", (req, res) => {
//   console.log("something happened");
//   res.sendFile(path.join(__dirname, "app", "index.html"));
// });

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);
// app.use(express.static("module"))
