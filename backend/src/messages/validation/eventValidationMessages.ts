import { eventConstants } from "resources/constants/eventConstants";

export const eventFailedValidation = {
  NAME_REQUIRED_MESSAGE: "Name is required field",
  NAME_INVALID_TYPE_MESSAGE: "Name must be a string",
  NAME_BELOW_MIN_MESSAGE: `Name must be at least ${eventConstants.NAME_MIN} characters long`,
  NAME_ABOVE_MAX_MESSAGE: `Name must be no longer than ${eventConstants.NAME_MAX} characters`,
  SUMMARY_REQUIRED_MESSAGE: "Summary is a required field",
  SUMMARY_INVALID_TYPE_MESSAGE: "Summary must be a string",
  SUMMARY_BELOW_MIN_MESSAGE: `Summary must be at least ${eventConstants.SUMMARY_MIN} characters long`,
  SUMMARY_ABOVE_MAX_MESSAGE: `Summary must be no longer than ${eventConstants.SUMMARY_MAX} characters`,
  STARTING_DATE_REQUIRED_MESSAGE: "Starting date is a required field",
  STARTING_DATE_INVALID_MESSAGE: "Starting date must be a valid date",
  ENDING_DATE__REQUIRED_MESSAGE: "Ending date is a required field",
  ENDING_DATE_INVALID_MESSAGE: "Ending date must be a valid date",
  STATUS_REQUIRED_MESSAGE: "Status is a required field",
  STATUS_INVALID_MESSAGE: `Status has a standard set of constant values. See relevant documentation`,
};
