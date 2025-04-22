import { AppDataSource } from "db/dataSource";
import express from "express";
import "reflect-metadata";

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

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

main();
