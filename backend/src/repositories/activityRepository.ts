import { validate, ValidationError } from "class-validator";
import { AppDataSource } from "db/dataSource";
import { Activity } from "entities/primary/Activity";
import { appLogger } from "logs/loggerConfig";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { TypeORMError } from "typeorm";

const activityRepository = AppDataSource.getRepository(Activity);

export const createActivity = async (
  newActivity: Activity
): Promise<Activity> => {
  try {
    const errors = await validate(newActivity);
    if (errors.length > 0) {
      /**
       * Convert an array of ValidationError objects to an
       * object containing the constraints field of each
       * ValidationError.
       */
      const constraintArray: (Record<string, string> | undefined)[] = [];
      errors.forEach((err) => constraintArray.push(err.constraints));
      const constraintObject = Object.assign({}, ...constraintArray);

      /**
       * Assign the object to the constraints field of
       * a new ValidationError instance.
       */
      const validationError = new ValidationError();
      validationError.constraints = constraintObject;

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
      `Activity repository: ${createActivity.name} -> ServerError thrown`
    );
    throw new Error(commonResponseMessages.SERVER_ERROR_MESSAGE);
  }
};

// TODO: export const getActivityByTitle = async(title: string) => {}
// TODO: export const getActivitiesByType = async(activityType: ActivityType) => {}
// TODO: export const getActivityById = async(id: number) => {}
// TODO: export const updateActivity = async(updateDTO: IActivityUpdate) => {}
// TODO: export const deleteActivityById = async(id: number) => {}
// TODO: export const deleteActivityByTitle = async(title: string) => {}
