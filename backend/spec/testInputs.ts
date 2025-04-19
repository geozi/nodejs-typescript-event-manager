import { EmployerContactInfo } from "entities/EmployerContactInfo";
import { IndustryType } from "enums/IndustryType";

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
