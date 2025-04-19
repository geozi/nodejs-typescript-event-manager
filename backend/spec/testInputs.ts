import { EmployerContactInfo } from "entities/EmployerContactInfo";
import { IndustryType } from "enums/IndustryType";

export const validEmployerInputs = {
  id: 1,
  companyName: "Tech solutions",
  industry: IndustryType.InformationTechnology,
  employerContactInfo: new EmployerContactInfo(),
};
