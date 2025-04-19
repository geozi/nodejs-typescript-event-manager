import { commonConstants } from "resources/constants/commonConstants";

export const commonFailedValidation = {
  EMAIL_REQUIRED_MESSAGE: "Email is a required field",
  EMAIL_INVALID_MESSAGE: "Email must be a valid email address",
  PHONE_NUMBER_REQUIRED: "Phone number is a required field",
  PHONE_NUMBER_INVALID_TYPE_MESSAGE: "Phone number must be a string",
  PHONE_NUMBER_INVALID_FORMAT_MESSAGE: `Phone number must be a ${commonConstants.PHONE_NUMBER_LENGTH}-digit long number`,
};
