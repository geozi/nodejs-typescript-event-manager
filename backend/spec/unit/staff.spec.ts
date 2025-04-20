import { validateSync } from "class-validator";
import { Staff } from "entities/Staff";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { staffFailedValidation } from "messages/validation/staffValidationMessages";
import {
  invalidCommonInputs,
  invalidStaffInputs,
  validCommonInputs,
  validStaffInputs,
} from "spec/testInputs";

describe("Staff entity validation tests", () => {
  let mockStaff: Partial<Staff>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockStaff = new Staff();
      mockStaff.id = validCommonInputs.id;
      mockStaff.firstName = validCommonInputs.firstName;
      mockStaff.lastName = validCommonInputs.lastName;
      mockStaff.jobTitle = validStaffInputs.jobTitle;
      mockStaff.department = validStaffInputs.department;
    });

    it("staff has valid inputs", () => {
      const errors = validateSync(mockStaff);

      expect(errors.length).toEqual(0);
      expect(mockStaff.toString()).toEqual(validStaffInputs.toString());
    });
  });

  describe("Negative scenario", () => {
    beforeEach(() => {
      // Mocks
      mockStaff = new Staff();
      mockStaff.id = validCommonInputs.id;
      mockStaff.firstName = validCommonInputs.firstName;
      mockStaff.lastName = validCommonInputs.lastName;
      mockStaff.jobTitle = validStaffInputs.jobTitle;
      mockStaff.department = validStaffInputs.department;
    });

    it("firstName is undefined", () => {
      mockStaff.firstName = undefined;

      const errors = validateSync(mockStaff);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.FIRST_NAME_REQUIRED_MESSAGE,
        isString: commonFailedValidation.FIRST_NAME_INVALID_TYPE_MESSAGE,
        isAlpha: commonFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("firstName is invalid", () => {
      mockStaff.firstName = invalidCommonInputs.FIRST_NAME_INVALID;

      const errors = validateSync(mockStaff);

      expect(errors[0].value).toEqual(invalidCommonInputs.FIRST_NAME_INVALID);
      expect(errors[0].constraints).toEqual({
        isAlpha: commonFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("lastName is undefined", () => {
      mockStaff.lastName = undefined;

      const errors = validateSync(mockStaff);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.LAST_NAME_REQUIRED_MESSAGE,
        isString: commonFailedValidation.LAST_NAME_INVALID_TYPE_MESSAGE,
        isAlpha: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("lastName is invalid", () => {
      mockStaff.lastName = invalidCommonInputs.LAST_NAME_INVALID;

      const errors = validateSync(mockStaff);

      expect(errors[0].value).toEqual(invalidCommonInputs.LAST_NAME_INVALID);
      expect(errors[0].constraints).toEqual({
        isAlpha: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("jobTitle is undefined", () => {
      mockStaff.jobTitle = undefined;

      const errors = validateSync(mockStaff);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: staffFailedValidation.JOB_TITLE_REQUIRED_MESSAGE,
        isString: staffFailedValidation.JOB_TITLE_INVALID_TYPE_MESSAGE,
      });
    });

    it("department is undefined", () => {
      mockStaff.department = undefined;

      const errors = validateSync(mockStaff);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: staffFailedValidation.DEPT_REQUIRED_MESSAGE,
        isEnum: staffFailedValidation.DEPT_INVALID_MESSAGE,
      });
    });

    it("department is invalid", () => {
      mockStaff.department = invalidStaffInputs.DEPT_INVALID;

      const errors = validateSync(mockStaff);

      expect(errors[0].value).toEqual(invalidStaffInputs.DEPT_INVALID);
      expect(errors[0].constraints).toEqual({
        isEnum: staffFailedValidation.DEPT_INVALID_MESSAGE,
      });
    });
  });
});
