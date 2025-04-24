import { ActivityType } from "enums/ActivityType";

export interface IActivityUpdate {
  id: number;
  title?: string;
  description?: string;
  activityType?: ActivityType;
}
