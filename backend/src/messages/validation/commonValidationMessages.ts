import { commonConstants } from "resources/constants/commonConstants";

export const commonFailedValidation = {
  FIRST_NAME_REQUIRED_MESSAGE: "First name is a required field",
  FIRST_NAME_INVALID_TYPE_MESSAGE: "First name must be a string",
  FIRST_NAME_INVALID_FORMAT_MESSAGE: "First name must only contain letters",
  LAST_NAME_REQUIRED_MESSAGE: "Last name is a required field",
  LAST_NAME_INVALID_TYPE_MESSAGE: "Last name must be a string",
  LAST_NAME_INVALID_FORMAT_MESSAGE: "Last name must only contain letters",
  EMAIL_REQUIRED_MESSAGE: "Email is a required field",
  EMAIL_INVALID_MESSAGE: "Email must be a valid email address",
  PHONE_NUMBER_REQUIRED_MESSAGE: "Phone number is a required field",
  PHONE_NUMBER_INVALID_TYPE_MESSAGE: "Phone number must be a string",
  PHONE_NUMBER_INVALID_FORMAT_MESSAGE: `Phone number must be a ${commonConstants.PHONE_NUMBER_LENGTH}-digit long number`,
  ID_REQUIRED_MESSAGE: "ID is a required field",
  ID_INVALID_TYPE_MESSAGE: "ID must be an integer",
  ID_NEGATIVE_MESSAGE: "ID must be a positive integer",
};
