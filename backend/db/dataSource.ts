import * as dotenv from "dotenv";
import { Activity } from "entities/Activity";
import { Client } from "entities/Client";
import { Employer } from "entities/Employer";
import { EmployerContactInfo } from "entities/EmployerContactInfo";
import { EventClient } from "entities/EventClient";
import { Staff } from "entities/Staff";
import { DataSource } from "typeorm";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USER as string,
  password: process.env.DB_KEY as string,
  database: process.env.DB_NAME as string,
  synchronize: true,
  logging: false,
  entities: [
    Activity,
    Client,
    Employer,
    EmployerContactInfo,
    Event,
    EventClient,
    Staff,
  ],
  migrations: [],
  subscribers: [],
});
