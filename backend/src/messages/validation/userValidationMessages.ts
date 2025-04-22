import { userConstants } from "resources/constants/userConstants";

export const userFailedValidation = {
  USERNAME_REQUIRED_MESSAGE: "Username is a required field",
  USERNAME_INVALID_TYPE_MESSAGE: "Username must be string",
  USERNAME_BELOW_MIN_MESSAGE: `Username must be at least ${userConstants.USERNAME_MIN_LENGTH} characters long`,
  USERNAME_ABOVE_MAX_MESSAGE: `Username must be no longer than ${userConstants.USERNAME_MAX_LENGTH} characters`,
  PASSWORD_REQUIRED_MESSAGE: "Password is a required field",
  PASSWORD_BELOW_MIN_MESSAGE: `Password must be at least ${userConstants.PASSWORD_MIN_LENGTH} characters long`,
  PASSWORD_INVALID_TYPE_MESSAGE: "Password must be a string",
  PASSWORD_INVALID_FORMAT_MESSAGE: `Password must have at least: one lowercase character, one uppercase character, one number, and one special symbol`,
  ROLE_REQUIRED_MESSAGE: "Role is a required field",
  ROLE_INVALID_MESSAGE: `Role has a standard set of constant values. See relevant documentation`,
};
