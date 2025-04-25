import { Activity } from "entities/primary/Activity";
import { Request } from "express";

export const reqToActivity = (req: Request) => {
  const { title, description, activityType } = req.body;

  const newActivity = new Activity();
  newActivity.title = title;
  newActivity.description = description;
  newActivity.activityType = activityType;

  return newActivity;
};
