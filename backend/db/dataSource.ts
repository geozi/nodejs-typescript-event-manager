import * as dotenv from "dotenv";
import { EventClient } from "entities/intermediary/EventClient";
import { Activity } from "entities/primary/Activity";
import { Client } from "entities/primary/Client";
import { Employer } from "entities/primary/Employer";
import { EmployerContactInfo } from "entities/primary/EmployerContactInfo";
import { Event } from "entities/primary/Event";
import { Staff } from "entities/primary/Staff";
import { User } from "entities/primary/User";
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
    User,
  ],
  migrations: [],
  subscribers: [],
});
