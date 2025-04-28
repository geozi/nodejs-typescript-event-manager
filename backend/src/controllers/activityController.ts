import { CustomValidationError } from "errors/CustomValidationError";
import { NotFoundError } from "errors/NotFoundError";
import { ServerError } from "errors/ServerError";
import { Request, Response } from "express";
import { appLogger } from "logs/loggerConfig";
import {
  reqToActivity,
  reqToActivityUpdateDTO,
  reqToTitle,
} from "mappers/activityMapper";
import { reqToId } from "mappers/commonMapper";
import { activityResponseMessages } from "messages/response/activityResponseMessages";
import {
  createActivity,
  deleteActivityById,
  deleteActivityByTitle,
  getActivityById,
  getActivityByTitle,
  updateActivity,
} from "repositories/activityRepository";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import { TypeORMError } from "typeorm";

export const callActivityCreation = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const callActivityUpdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const activityToUpdate = reqToActivityUpdateDTO(req);
    const updatedActivity = await updateActivity(activityToUpdate);

    if (updatedActivity === null) {
      appLogger.error(
        `Activity controller: ${callActivityUpdate.name} -> ${NotFoundError.name} thrown`
      );

      throw new NotFoundError(
        activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE
      );
    }

    res
      .setHeader("x-api-version", apiVersionNumbers.VERSION_1_0)
      .status(httpCodes.OK)
      .json({
        data: updatedActivity,
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

    if (error instanceof NotFoundError) {
      res
        .status(httpCodes.NOT_FOUND)
        .json({ message: activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE });
      return;
    }
  }
};

export const callActivityRetrievalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = reqToId(req);
    const retrievedActivity = await getActivityById(id);
    if (retrievedActivity === null) {
      throw new NotFoundError(
        activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE
      );
    }

    res
      .setHeader("x-api-version", apiVersionNumbers.VERSION_1_0)
      .status(httpCodes.OK)
      .json({
        data: retrievedActivity,
      });
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(httpCodes.BAD_REQUEST).json({ message: error.message });
      return;
    }

    if (error instanceof TypeORMError || error instanceof ServerError) {
      res
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
      return;
    }

    if (error instanceof NotFoundError) {
      res
        .status(httpCodes.NOT_FOUND)
        .json({ message: activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE });
      return;
    }
  }
};

export const callActivityRetrievalByTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const title = reqToTitle(req);

    const retrievedActivity = await getActivityByTitle(title);
    if (retrievedActivity === null) {
      throw new NotFoundError(
        activityResponseMessages.ACTIVITY_S_NOT_FOUND_MESSAGE
      );
    }

    res
      .setHeader("x-api-version", apiVersionNumbers.VERSION_1_0)
      .status(httpCodes.OK)
      .json({
        data: retrievedActivity,
      });
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(httpCodes.BAD_REQUEST).json({ message: error.message });
      return;
    }

    if (error instanceof TypeORMError || error instanceof ServerError) {
      res
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
      return;
    }

    if (error instanceof NotFoundError) {
      res
        .status(httpCodes.NOT_FOUND)
        .json({ message: activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE });
      return;
    }
  }
};

export const callActivityRemovalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = reqToId(req);
    const removedId = await deleteActivityById(id);
    if (removedId === null) {
      throw new NotFoundError(
        activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE
      );
    }

    res
      .setHeader("x-api-version", apiVersionNumbers.VERSION_1_0)
      .status(httpCodes.NO_CONTENT)
      .json({});
  } catch (error) {
    if (error instanceof TypeORMError || error instanceof ServerError) {
      res
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
      return;
    }

    if (error instanceof NotFoundError) {
      res
        .status(httpCodes.NOT_FOUND)
        .json({ message: activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE });
      return;
    }
  }
};

export const callActivityRemovalByTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.body;
    const removedActivity = await deleteActivityByTitle(title);
    if (removedActivity === null) {
      throw new NotFoundError(
        activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE
      );
    }

    res
      .setHeader("x-api-version", apiVersionNumbers.VERSION_1_0)
      .status(httpCodes.NO_CONTENT)
      .json({});
  } catch (error) {
    if (error instanceof TypeORMError || error instanceof ServerError) {
      res
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
      return;
    }

    if (error instanceof NotFoundError) {
      res
        .status(httpCodes.NOT_FOUND)
        .json({ message: activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE });
      return;
    }
  }
};

// TODO: callActivityRetrievalByType
