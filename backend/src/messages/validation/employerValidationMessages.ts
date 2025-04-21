import { employerConstants } from "resources/constants/employerConstants";

export const employerFailedValidationMessages = {
  COMPANY_NAME_REQUIRED_MESSAGE: "Company name is a required field",
  COMPANY_NAME_ABOVE_MAX_LENGTH_MESSAGE: `Company name must be no longer than ${employerConstants.COMPANY_NAME_MAX_LENGTH} characters long`,
  COMPANY_NAME_BELOW_MIN_LENGTH_MESSAGE: `Company name must be at least ${employerConstants.COMPANY_NAME_MIN_LENGTH} characters long`,
  COMPANY_NAME_INVALID_TYPE_MESSAGE: "Company name must be a string",
  INDUSTRY_REQUIRED_MESSAGE: "Industry is a required field",
  INDUSTRY_INVALID_MESSAGE: `Industry has a standard set of constant values. See relevant documentation`,
};
