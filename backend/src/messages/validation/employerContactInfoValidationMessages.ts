import { localCitiesAsObj } from "enums/LocalCityList";
import { employerContactInfoConstants } from "resources/constants/employerContactInfoConstants";

export const employerContactInfoFailedValidation = {
  PHONE_NUMBER_INVALID_TYPE_MESSAGE: "Phone number must be a string",
  PHONE_NUMBER_INVALID_FORMAT_MESSAGE: `Phone number must be a ${employerContactInfoConstants.PHONE_NUMBER_LENGTH}-digit long number`,
  EMAIL_INVALID_MESSAGE: "Email must be a valid email address",
  STREET_ADDRESS_INVALID_TYPE_MESSAGE: "Street address must be a string",
  STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE: `Street address must be at least ${employerContactInfoConstants.STREET_ADDRESS_MIN_LENGTH} characters long`,
  STREET_ADDRESS_ABOVE_MAX_LENGTH_MESSAGE: `Street address must be no longer than ${employerContactInfoConstants.STREET_ADDRESS_MAX_LENGTH} characters long`,
  CITY_INVALID_MESSAGE: `City must be one of the following: ${Object.values(
    localCitiesAsObj
  )}`,
};
