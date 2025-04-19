import { EmployerContactInfo } from "entities/EmployerContactInfo";
import { IndustryType } from "enums/IndustryType";
import { LocalCities } from "enums/LocalCityList";

export const validEmployerInputs = {
  id: 1,
  companyName: "Tech solutions",
  industry: IndustryType.InformationTechnology,
  employerContactInfo: new EmployerContactInfo(),
};

export const invalidEmployerInputs = {
  COMPANY_NAME_INVALID_TYPE: 12,
  COMPANY_NAME_TOO_SHORT: "C",
  COMPANY_NAME_TOO_LONG: `International Association for Advanced Technological Innovations and Sustainable Development`,
  INDUSTRY_TYPE_INVALID: "Leisure Activities",
};

export const validEmployerContactInfoInputs = {
  id: 1,
  phoneNumber: "8372045916",
  email: "new@mail.com",
  streetAddress: "Acropolis 1",
  city: LocalCities.Athens,
};

export const invalidEmployerContactInfoInputs = {
  PHONE_NUMBER_TOO_SHORT: "6999",
  PHONE_NUMBER_TOO_LONG: "6999999999999",
  PHONE_NUMBER_INVALID_FORMAT: "699-99-999",
  EMAIL_INVALID_CASES: [
    ["email has no prefix", "@mail.com"],
    ["email has no @", "randommail.com"],
    ["email has no domain name", "random@.com"],
    ["email has no .", "random@mailcom"],
    ["email has no top level domain", "random@mail."],
  ] as [string, string][],
  STREET_ADDRESS_TOO_SHORT: "St.",
  STREET_ADDRESS_TOO_LONG: `12345 Grand Avenue, Apartment 678, Eastwood Business Plaza, Building 9, Suite 452A, Springfield, IL, 62704, United States`,
  CITY_INVALID: "New York",
};
