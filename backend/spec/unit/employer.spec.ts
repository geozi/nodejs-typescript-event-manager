import { validateSync } from "class-validator";
import { Employer } from "entities/Employer";
import { validEmployerInputs } from "spec/testInputs";

describe("Employer entity unit tests", () => {
  let mockEmployer: Employer;

  describe("Positive scenario", () => {
    beforeEach(() => {
      mockEmployer = new Employer();
      mockEmployer.companyName = validEmployerInputs.companyName;
      mockEmployer.industry = validEmployerInputs.industry;
      mockEmployer.employerContactInfo =
        validEmployerInputs.employerContactInfo;
    });

    it("employer has valid inputs", () => {
      const errors = validateSync(mockEmployer);

      expect(errors.length).toEqual(0);
      expect(mockEmployer.companyName).toEqual(validEmployerInputs.companyName);
      expect(mockEmployer.industry).toEqual(validEmployerInputs.industry);
      expect(mockEmployer.employerContactInfo).toEqual(
        validEmployerInputs.employerContactInfo
      );
    });
  });
});
