import { EmployerContactInfo } from "entities/EmployerContactInfo";
import { DeptCategory } from "enums/DeptCategory";
import { EmploymentStatus } from "enums/EmploymentStatus";
import { IndustryType } from "enums/IndustryType";
import { LocalCities } from "enums/LocalCityList";

export const validEmployerInputs = {
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
  streetAddress: "Acropolis 1",
  city: LocalCities.Athens,
};

export const invalidEmployerContactInfoInputs = {
  STREET_ADDRESS_TOO_SHORT: "St.",
  STREET_ADDRESS_TOO_LONG: `12345 Grand Avenue, Apartment 678, Eastwood Business Plaza, Building 9, Suite 452A, Springfield, IL, 62704, United States`,
  CITY_INVALID: "New York",
};

export const validParticipantInputs = {
  employmentStatus: EmploymentStatus.Unemployed,
  ticketId: "EMP20250419RN453190",
};

export const invalidParticipantInputs = {
  EMPLOYMENT_STATUS_INVALID: "Too employed",
  TICKET_ID_INVALID: "1234*@34",
};

export const validCommonInputs = {
  id: 1,
  firstName: "Jayson",
  lastName: "Johnson",
  email: "mymail@mail.com",
  phoneNumber: "6999999999",
};

export const invalidCommonInputs = {
  FIRST_NAME_INVALID: "Ja1s0n*",
  LAST_NAME_INVALID: "J0hns0n",
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
};

export const validStaffInputs = {
  jobTitle: "Talent recruiter",
  department: DeptCategory.Recruitment,
};
