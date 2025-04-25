import { validate, ValidationError } from "class-validator";
import { Activity } from "entities/primary/Activity";
import { Request } from "express";
import { extractValidationErrorConstraints } from "utilities/utilityFunctions";

export const reqToActivity = async (req: Request) => {
  const { title, description, activityType } = req.body;

  const newActivity = new Activity();
  newActivity.title = title;
  newActivity.description = description;
  newActivity.activityType = activityType;

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

  return newActivity;
};
