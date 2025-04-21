import { employerContactInfoConstants } from "resources/constants/employerContactInfoConstants";

export const employerContactInfoFailedValidation = {
  STREET_ADDRESS_REQUIRED_MESSAGE: "Street address is required field",
  STREET_ADDRESS_INVALID_TYPE_MESSAGE: "Street address must be a string",
  STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE: `Street address must be at least ${employerContactInfoConstants.STREET_ADDRESS_MIN_LENGTH} characters long`,
  STREET_ADDRESS_ABOVE_MAX_LENGTH_MESSAGE: `Street address must be no longer than ${employerContactInfoConstants.STREET_ADDRESS_MAX_LENGTH} characters long`,
  CITY_REQUIRED_MESSAGE: "City is a required field",
  CITY_INVALID_MESSAGE: `City has a standard set of constant values. See relevant documentation`,
};
