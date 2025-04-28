import { ActivityUpdateDTO } from "dto/ActivityUpdateDTO";
import { Activity } from "entities/primary/Activity";
import { Request } from "express";
import { appLogger } from "logs/loggerConfig";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";

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

export const reqToTitle = (req: Request): string => {
  const { title } = req.body;

  if (typeof title !== "string") {
    appLogger.error(
      `Activity mapper: ${reqToTitle.name} -> ${TypeError.name} thrown`
    );

    const typeError = new TypeError();
    typeError.message = activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE;

    throw typeError;
  }

  return title;
};
