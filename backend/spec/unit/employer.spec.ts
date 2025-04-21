import { validateSync } from "class-validator";
import { Employer } from "entities/Employer";
import { employerFailedValidationMessages } from "messages/validation/employerValidationMessages";
import {
  invalidEmployerInputs,
  validCommonInputs,
  validEmployerInputs,
} from "spec/testInputs";

describe("Employer entity validation tests", () => {
  let mockEmployer: Partial<Employer>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockEmployer = new Employer();
      mockEmployer.id = validCommonInputs.id;
      mockEmployer.companyName = validEmployerInputs.companyName;
      mockEmployer.industry = validEmployerInputs.industry;
      mockEmployer.employerContactInfo =
        validEmployerInputs.employerContactInfo;
    });

    it("employer has valid inputs", () => {
      const errors = validateSync(mockEmployer);

      expect(errors.length).toEqual(0);
      expect({ ...mockEmployer }).toEqual({
        id: validCommonInputs.id,
        ...validEmployerInputs,
      });
    });
  });

  describe("Negative scenarios", () => {
    beforeEach(() => {
      // Mocks
      mockEmployer = new Employer();
      mockEmployer.companyName = validEmployerInputs.companyName;
      mockEmployer.industry = validEmployerInputs.industry;
      mockEmployer.employerContactInfo =
        validEmployerInputs.employerContactInfo;
    });

    it("companyName is undefined", () => {
      mockEmployer.companyName = undefined;

      const errors = validateSync(mockEmployer);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty:
          employerFailedValidationMessages.COMPANY_NAME_REQUIRED_MESSAGE,
        isString:
          employerFailedValidationMessages.COMPANY_NAME_INVALID_TYPE_MESSAGE,
        maxLength:
          employerFailedValidationMessages.COMPANY_NAME_ABOVE_MAX_LENGTH_MESSAGE,
        minLength:
          employerFailedValidationMessages.COMPANY_NAME_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("companyName is too short", () => {
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

    it("companyName is too long", () => {
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

    it("industry is undefined", () => {
      mockEmployer.industry = undefined;

      const errors = validateSync(mockEmployer);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: employerFailedValidationMessages.INDUSTRY_REQUIRED_MESSAGE,
        isEnum: employerFailedValidationMessages.INDUSTRY_INVALID_MESSAGE,
      });
    });

    it("industry is invalid", () => {
      mockEmployer.industry = invalidEmployerInputs.INDUSTRY_TYPE_INVALID;

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
