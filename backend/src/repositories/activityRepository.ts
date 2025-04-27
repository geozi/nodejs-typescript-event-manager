import { validate } from "class-validator";
import { AppDataSource } from "db/dataSource";
import { ActivityUpdateDTO } from "dto/ActivityUpdateDTO";
import { Activity } from "entities/primary/Activity";
import { ActivityType } from "enums/ActivityType";
import { CustomValidationError } from "errors/CustomValidationError";
import { appLogger } from "logs/loggerConfig";
import {
  determineError,
  extractValidationErrorConstraints,
} from "utilities/utilityFunctions";

const activityRepository = AppDataSource.getRepository(Activity);

export const getActivityByTitle = async (
  title: string
): Promise<Activity | null> => {
  try {
    return await activityRepository.findOneBy({ title: title });
  } catch (error) {
    const errorWithType = determineError(error);
    appLogger.error(
      `Activity repository: ${getActivityByTitle.name} -> ${errorWithType.name} thrown`
    );

    throw errorWithType;
  }
};

export const getActivitiesByType = async (
  activityType: ActivityType
): Promise<Activity[]> => {
  try {
    return await activityRepository.findBy({ activityType: activityType });
  } catch (error) {
    const errorWithType = determineError(error);
    appLogger.error(
      `Activity repository: ${getActivitiesByType.name} -> ${errorWithType.name} thrown`
    );

    throw errorWithType;
  }
};

export const getActivityById = async (id: number): Promise<Activity | null> => {
  try {
    return await activityRepository.findOneBy({ id: id });
  } catch (error) {
    const errorWithType = determineError(error);
    appLogger.error(
      `Activity repository: ${getActivityById.name} -> ${errorWithType.name} thrown`
    );

    throw errorWithType;
  }
};

export const createActivity = async (
  newActivity: Activity
): Promise<Activity> => {
  try {
    const errors = await validate(newActivity);

    let validationError: CustomValidationError;
    if (errors.length > 0) {
      validationError = new CustomValidationError();
      if (errors.length === 1) {
        validationError.constraints = errors[0].constraints;
      } else {
        const constraintObject = extractValidationErrorConstraints(errors);
        validationError.constraints = constraintObject;
      }

      throw validationError;
    }

    return await activityRepository.save(newActivity);
  } catch (error) {
    const errorWithType = determineError(error);
    appLogger.error(
      `Activity repository: ${createActivity.name} -> ${errorWithType.name} thrown`
    );

    throw errorWithType;
  }
};

export const updateActivity = async (
  updateDTO: ActivityUpdateDTO
): Promise<Activity | null> => {
  try {
    const { id, title, description, activityType } = updateDTO;
    const result = await activityRepository.update(
      { id: id },
      { title, description, activityType }
    );

    if (result.affected === 0) {
      return Promise.resolve(null);
    }

    return await activityRepository.findOneBy({ id: updateDTO.id });
  } catch (error) {
    const errorWithType = determineError(error);
    appLogger.error(
      `Activity repository: ${updateActivity.name} -> ${errorWithType.name} thrown`
    );

    throw errorWithType;
  }
};

export const deleteActivityById = async (
  id: number
): Promise<Activity | null> => {
  try {
    const activityToRemove = await activityRepository.findOneBy({ id: id });
    if (activityToRemove === null) {
      return Promise.resolve(null);
    }

    return await activityRepository.remove(activityToRemove);
  } catch (error) {
    const errorWithType = determineError(error);
    appLogger.error(
      `Activity repository: ${deleteActivityById.name} -> ${errorWithType.name} thrown`
    );

    throw errorWithType;
  }
};

export const deleteActivityByTitle = async (
  title: string
): Promise<Activity | null> => {
  try {
    const activityToRemove = await activityRepository.findOneBy({
      title: title,
    });
    if (activityToRemove === null) {
      return Promise.resolve(null);
    }

    return await activityRepository.remove(activityToRemove);
  } catch (error) {
    const errorWithType = determineError(error);
    appLogger.error(
      `Activity repository: ${deleteActivityByTitle.name} -> ${errorWithType.name} thrown`
    );

    throw errorWithType;
  }
};
