import { ActivityUpdateDTO } from "dto/ActivityUpdateDTO";
import { Activity } from "entities/primary/Activity";
import { Request } from "express";

export const reqToActivity = (req: Request): Activity => {
  const { title, description, activityType } = req.body;

  const newActivity = new Activity();
  newActivity.title = title;
  newActivity.description = description;
  newActivity.activityType = activityType;

  return newActivity;
};

export const reqToActivityUpdateDTO = (req: Request): ActivityUpdateDTO => {
  const { id, title, description, activityType } = req.body;

  const activityToUpdate = new ActivityUpdateDTO();
  activityToUpdate.id = id;
  activityToUpdate.title = title;
  activityToUpdate.description = description;
  activityToUpdate.activityType = activityType;

  return activityToUpdate;
};
