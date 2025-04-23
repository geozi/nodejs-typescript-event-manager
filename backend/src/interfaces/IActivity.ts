import { EventActivity } from "entities/intermediary/EventActivity";
import { ActivityType } from "enums/ActivityType";

export interface IActivity {
  id: number;
  title: string;
  description: string;
  activityType: ActivityType;
  createdAt: Date;
  updatedAt: Date;
  events: EventActivity[];
}
