import { CustomValidationError } from "errors/CustomValidationError";
import { Request, Response } from "express";
import { reqToActivity } from "mappers/activityMapper";
import { createActivity } from "repositories/activityRepository";
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

    if (error instanceof TypeORMError || error instanceof Error) {
      res.status(httpCodes.BAD_REQUEST).json(error.message);
      return;
    }
  }
};
