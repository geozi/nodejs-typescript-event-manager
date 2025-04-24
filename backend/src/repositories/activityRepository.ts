import { validate, ValidationError } from "class-validator";
import { AppDataSource } from "db/dataSource";
import { ActivityUpdateDTO } from "dto/ActivityUpdateDTO";
import { Activity } from "entities/primary/Activity";
import { ActivityType } from "enums/ActivityType";
import { appLogger } from "logs/loggerConfig";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { TypeORMError } from "typeorm";
import { extractValidationErrorConstraints } from "utilities/constraintExtractor";

const activityRepository = AppDataSource.getRepository(Activity);

export const getActivityByTitle = async (
  title: string
): Promise<Activity | null> => {
  try {
    return await activityRepository.findOneBy({ title: title });
  } catch (error) {
    if (error instanceof TypeORMError || error instanceof Error) {
      appLogger.error(
        `Activity repository: ${getActivityByTitle.name} -> ${error.name} thrown`
      );

      throw error;
    }

    appLogger.error(
      `Activity repository: ${getActivityByTitle.name} -> Internal server error thrown`
    );
    throw new Error(commonResponseMessages.SERVER_ERROR_MESSAGE);
  }
};

export const getActivitiesByType = async (
  activityType: ActivityType
): Promise<Activity[]> => {
  try {
    return await activityRepository.findBy({ activityType: activityType });
  } catch (error) {
    if (error instanceof TypeORMError || error instanceof Error) {
      appLogger.error(
        `Activity repository: ${getActivitiesByType.name} -> ${error.name} thrown`
      );

      throw error;
    }

    appLogger.error(
      `Activity repository: ${getActivitiesByType.name} -> Internal server error thrown`
    );
    throw new Error(commonResponseMessages.SERVER_ERROR_MESSAGE);
  }
};

export const getActivityById = async (id: number): Promise<Activity | null> => {
  try {
    return await activityRepository.findOneBy({ id: id });
  } catch (error: TypeORMError | Error | unknown) {
    if (error instanceof TypeORMError || error instanceof Error) {
      appLogger.error(
        `Activity repository: ${getActivityById.name} -> ${error.name} thrown`
      );

      throw error;
    }


  }

  }
};

export const createActivity = async (
  newActivity: Activity
): Promise<Activity> => {
  try {
    const errors = await validate(newActivity);

    let validationError: ValidationError;
    if (errors.length > 0) {
      validationError = new ValidationError();
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
    if (error instanceof TypeORMError || error instanceof Error) {
      appLogger.error(
        `Activity repository: ${createActivity.name} -> ${error.name} thrown`
      );

      throw error;
    }

    if (error instanceof ValidationError) {
      appLogger.error(
        `Activity repository: ${createActivity.name} -> ValidationError thrown`
      );

      throw error;
    }

    appLogger.error(
      `Activity repository: ${createActivity.name} -> Internal server error thrown`
    );
    throw new Error(commonResponseMessages.SERVER_ERROR_MESSAGE);
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

    return await activityRepository.findOneBy({ id: id });
  } catch (error) {
    if (error instanceof TypeORMError || error instanceof Error) {
      appLogger.error(
        `Activity repository: ${updateActivity.name} -> ${error.name} thrown`
      );

      throw error;
    }

    appLogger.error(
      `Activity repository: ${updateActivity.name} -> Internal server error thrown`
    );

    throw new Error(commonResponseMessages.SERVER_ERROR_MESSAGE);
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
    if (error instanceof TypeORMError || error instanceof Error) {
      appLogger.error(
        `Activity repository: ${deleteActivityById.name} -> ${error.name} thrown`
      );

      throw error;
    }

    appLogger.error(
      `Activity repository: ${deleteActivityById.name} -> Internal server error throw`
    );

    throw new Error(commonResponseMessages.SERVER_ERROR_MESSAGE);
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
    if (error instanceof TypeORMError || error instanceof Error) {
      appLogger.error(
        `Activity repository: ${deleteActivityByTitle.name} -> ${error.name} thrown`
      );

      throw error;
    }

    appLogger.error(
      `Activity repository: ${deleteActivityByTitle.name} -> Internal server error throw`
    );

    throw new Error(commonResponseMessages.SERVER_ERROR_MESSAGE);
  }
};
