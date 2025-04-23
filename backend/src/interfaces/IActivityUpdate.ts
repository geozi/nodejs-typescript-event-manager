import { ActivityType } from "enums/ActivityType";

export interface IActivityUpdate {
  title?: string;
  description?: string;
  activityType?: ActivityType;
}
