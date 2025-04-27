import { CustomValidationError } from "errors/CustomValidationError";
import { ServerError } from "errors/ServerError";
import { Request, Response } from "express";
import { reqToActivity, reqToActivityUpdateDTO } from "mappers/activityMapper";
import { activityResponseMessages } from "messages/response/activityResponseMessages";
import {
  createActivity,
  updateActivity,
} from "repositories/activityRepository";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import { TypeORMError } from "typeorm";

export const callActivityCreation = async (req: Request, res: Response) => {
  try {
    const newActivity = reqToActivity(req);
    const savedActivity = await createActivity(newActivity);

    res
      .setHeader("x-api-version", apiVersionNumbers.VERSION_1_0)
      .status(httpCodes.CREATED)
      .json({
        data: savedActivity,
      });
  } catch (error) {
    if (error instanceof CustomValidationError) {
      res.status(httpCodes.BAD_REQUEST).json(error.constraints);
      return;
    }

    if (error instanceof TypeORMError || error instanceof ServerError) {
      res
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
      return;
    }
  }
};

export const callActivityUpdate = async (req: Request, res: Response) => {
  try {
    const activityToUpdate = reqToActivityUpdateDTO(req);
    const updatedActivity = await updateActivity(activityToUpdate);

    if (updatedActivity === null) {
      res
        .status(httpCodes.NOT_FOUND)
        .json({ message: activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE });
      return;
    }

    res
      .setHeader("x-api-version", apiVersionNumbers.VERSION_1_0)
      .status(httpCodes.OK)
      .json({
        data: updatedActivity,
      });
  } catch (error) {
    if (error instanceof TypeORMError || error instanceof ServerError) {
      res.status(httpCodes.INTERNAL_SERVER_ERROR).json(error.message);
      return;
    }
  }
};
