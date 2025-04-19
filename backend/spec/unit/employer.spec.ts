import { validateSync } from "class-validator";
import { Employer } from "entities/Employer";
import { IndustryType } from "enums/IndustryType";
import { employerFailedValidationMessages } from "messages/validation/employerValidationMessages";
import { invalidEmployerInputs, validEmployerInputs } from "spec/testInputs";

describe("Employer entity unit tests", () => {
  let mockEmployer: Employer;

  describe("Positive scenario", () => {
    beforeEach(() => {
      mockEmployer = new Employer();
      mockEmployer.id = validEmployerInputs.id;
      mockEmployer.companyName = validEmployerInputs.companyName;
      mockEmployer.industry = validEmployerInputs.industry;
      mockEmployer.employerContactInfo =
        validEmployerInputs.employerContactInfo;
    });

    it("employer has valid inputs", () => {
      const errors = validateSync(mockEmployer);

      expect(errors.length).toEqual(0);
      expect(mockEmployer.toString()).toEqual(validEmployerInputs.toString());
    });
  });

  describe("Negative scenarios", () => {
    describe("validation-oriented", () => {
      beforeEach(() => {
        mockEmployer = new Employer();
        mockEmployer.companyName = validEmployerInputs.companyName;
        mockEmployer.industry = validEmployerInputs.industry;
        mockEmployer.employerContactInfo =
          validEmployerInputs.employerContactInfo;
      });

      it("company name is too short", () => {
        mockEmployer.companyName = invalidEmployerInputs.COMPANY_NAME_TOO_SHORT;

        const errors = validateSync(mockEmployer);

        expect(errors[0].value).toEqual(
          invalidEmployerInputs.COMPANY_NAME_TOO_SHORT
        );
        expect(errors[0].constraints).toEqual({
          minLength:
            employerFailedValidationMessages.COMPANY_NAME_BELOW_MIN_LENGTH_MESSAGE,
        });
      });

      it("company name is too long", () => {
        mockEmployer.companyName = invalidEmployerInputs.COMPANY_NAME_TOO_LONG;

        const errors = validateSync(mockEmployer);

        expect(errors[0].value).toEqual(
          invalidEmployerInputs.COMPANY_NAME_TOO_LONG
        );
        expect(errors[0].constraints).toEqual({
          maxLength:
            employerFailedValidationMessages.COMPANY_NAME_ABOVE_MAX_LENGTH_MESSAGE,
        });
      });

      it("industry type is invalid", () => {
        mockEmployer.industry =
          invalidEmployerInputs.INDUSTRY_TYPE_INVALID as IndustryType;

        const errors = validateSync(mockEmployer);

        expect(errors[0].value).toEqual(
          invalidEmployerInputs.INDUSTRY_TYPE_INVALID
        );
        expect(errors[0].constraints).toEqual({
          isEnum: employerFailedValidationMessages.INDUSTRY_INVALID_MESSAGE,
        });
      });
    });
  });
});
