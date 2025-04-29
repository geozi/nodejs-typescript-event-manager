import cors from "cors";
import { AppDataSource } from "db/dataSource";
import express from "express";
import { catchJSONerror } from "middleware/catchers/jsonErrorCatcher";
import "reflect-metadata";
import { activityRouter } from "routes/activityRoutes";

const app = express();
const port = 3000;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Connection to database established");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
}

app.use(cors());
app.use(express.json());
app.use(catchJSONerror);

// Testing APIs
app.use("test/api/activities", activityRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

main();
