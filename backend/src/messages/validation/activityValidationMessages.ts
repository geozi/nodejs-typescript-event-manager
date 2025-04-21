import { activityConstants } from "resources/constants/activityConstants";

export const activityFailedValidation = {
  TITLE_REQUIRED_MESSAGE: "Title is a required field",
  TITLE_INVALID_TYPE_MESSAGE: "Title must be a string",
  TITLE_BELOW_MIN_LENGTH_MESSAGE: `Title must be at least ${activityConstants.TITLE_MIN_LENGTH} characters long`,
  TITLE_ABOVE_MAX_LENGTH_MESSAGE: `Title must be no longer than ${activityConstants.TITLE_MAX_LENGTH} characters`,
  DESCRIPTION_REQUIRED_MESSAGE: "Description is a required message",
  DESCRIPTION_INVALID_TYPE_MESSAGE: "Description must be a string",
  DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE: `Description must be at least ${activityConstants.DESCRIPTION_MIN_LENGTH} characters long`,
  DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE: `Description must be no longer than ${activityConstants.DESCRIPTION_MAX_LENGTH} characters`,
  ACTIVITY_TYPE_REQUIRED_MESSAGE: "Activity type is a required field",
  ACTIVITY_TYPE_INVALID_MESSAGE: `Activity type has a standard set of constant values. See relevant documentation`,
};
