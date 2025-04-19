import { industryTypeAsObj } from "src/enums/IndustryType";
import { employerConstants } from "src/resources/constants/employerConstants";

export const employerFailedValidationMessages = {
  COMPANY_NAME_ABOVE_MAX_LENGTH_MESSAGE: `Company name must be no longer than ${employerConstants.COMPANY_NAME_MAX_LENGTH} characters long`,
  COMPANY_NAME_BELOW_MIN_LENGTH_MESSAGE: `Company name must be at least ${employerConstants.COMPANY_NAME_MIN_LENGTH} characters long`,
  COMPANY_NAME_INVALID_MESSAGE: "Company name must be a string",
  INDUSTRY_INVALID_MESSAGE: `Industry must be one of the following: ${Object.values(
    industryTypeAsObj
  )}`,
};
