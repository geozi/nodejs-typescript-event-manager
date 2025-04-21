import { validateSync } from "class-validator";
import { EmployerContactInfo } from "entities/EmployerContactInfo";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { employerContactInfoFailedValidation } from "messages/validation/employerContactInfoValidationMessages";
import {
  invalidCommonInputs,
  invalidEmployerContactInfoInputs,
  validCommonInputs,
  validEmployerContactInfoInputs,
} from "spec/testInputs";

describe("EmployerContactInfo entity validation tests", () => {
  let mockEmployerContactInfo: Partial<EmployerContactInfo>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockEmployerContactInfo = new EmployerContactInfo();
      mockEmployerContactInfo.id = validCommonInputs.id;
      mockEmployerContactInfo.phoneNumber = validCommonInputs.phoneNumber;
      mockEmployerContactInfo.email = validCommonInputs.email;
      mockEmployerContactInfo.streetAddress =
        validEmployerContactInfoInputs.streetAddress;
      mockEmployerContactInfo.city = validEmployerContactInfoInputs.city;
    });

    it("employerContactInfo has valid inputs", () => {
      const errors = validateSync(mockEmployerContactInfo);

      expect(errors.length).toEqual(0);
      expect({ ...mockEmployerContactInfo }).toEqual({
        id: validCommonInputs.id,
        phoneNumber: validCommonInputs.phoneNumber,
        email: validCommonInputs.email,
        ...validEmployerContactInfoInputs,
      });
    });
  });

  describe("Negative scenarios", () => {
    beforeEach(() => {
      // Mocks
      mockEmployerContactInfo = new EmployerContactInfo();
      mockEmployerContactInfo.id = validCommonInputs.id;
      mockEmployerContactInfo.phoneNumber = validCommonInputs.phoneNumber;
      mockEmployerContactInfo.email = validCommonInputs.email;
      mockEmployerContactInfo.streetAddress =
        validEmployerContactInfoInputs.streetAddress;
      mockEmployerContactInfo.city = validEmployerContactInfoInputs.city;
    });

    it("phoneNumber is undefined", () => {
      mockEmployerContactInfo.phoneNumber = undefined;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.PHONE_NUMBER_REQUIRED,
        isString: commonFailedValidation.PHONE_NUMBER_INVALID_TYPE_MESSAGE,
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber is too short", () => {
      mockEmployerContactInfo.phoneNumber =
        invalidCommonInputs.PHONE_NUMBER_TOO_SHORT;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_TOO_SHORT
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber is too long", () => {
      mockEmployerContactInfo.phoneNumber =
        invalidCommonInputs.PHONE_NUMBER_TOO_LONG;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_TOO_LONG
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber has invalid format", () => {
      mockEmployerContactInfo.phoneNumber =
        invalidCommonInputs.PHONE_NUMBER_INVALID_FORMAT;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_INVALID_FORMAT
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("email is undefined", () => {
      mockEmployerContactInfo.email = undefined;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.EMAIL_REQUIRED_MESSAGE,
        isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
      });
    });

    invalidCommonInputs.EMAIL_INVALID_CASES.forEach(
      ([testName, invalidEmail]) => {
        it(testName, () => {
          mockEmployerContactInfo.email = invalidEmail;

          const errors = validateSync(mockEmployerContactInfo);

          expect(errors[0].value).toEqual(invalidEmail);
          expect(errors[0].constraints).toEqual({
            isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
          });
        });
      }
    );

    it("streetAddress is undefined", () => {
      mockEmployerContactInfo.streetAddress = undefined;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty:
          employerContactInfoFailedValidation.STREET_ADDRESS_REQUIRED_MESSAGE,
        isString:
          employerContactInfoFailedValidation.STREET_ADDRESS_INVALID_TYPE_MESSAGE,
        maxLength:
          employerContactInfoFailedValidation.STREET_ADDRESS_ABOVE_MAX_LENGTH_MESSAGE,
        minLength:
          employerContactInfoFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("streetAddress is too short", () => {
      mockEmployerContactInfo.streetAddress =
        invalidEmployerContactInfoInputs.STREET_ADDRESS_TOO_SHORT;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(
        invalidEmployerContactInfoInputs.STREET_ADDRESS_TOO_SHORT
      );
      expect(errors[0].constraints).toEqual({
        minLength:
          employerContactInfoFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("streetAddress is too long", () => {
      mockEmployerContactInfo.streetAddress =
        invalidEmployerContactInfoInputs.STREET_ADDRESS_TOO_LONG;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(
        invalidEmployerContactInfoInputs.STREET_ADDRESS_TOO_LONG
      );
      expect(errors[0].constraints).toEqual({
        maxLength:
          employerContactInfoFailedValidation.STREET_ADDRESS_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    it("city is undefined", () => {
      mockEmployerContactInfo.city = undefined;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: employerContactInfoFailedValidation.CITY_REQUIRED_MESSAGE,
        isEnum: employerContactInfoFailedValidation.CITY_INVALID_MESSAGE,
      });
    });

    it("city is invalid", () => {
      mockEmployerContactInfo.city =
        invalidEmployerContactInfoInputs.CITY_INVALID;

      const errors = validateSync(mockEmployerContactInfo);

      expect(errors[0].value).toEqual(
        invalidEmployerContactInfoInputs.CITY_INVALID
      );
      expect(errors[0].constraints).toEqual({
        isEnum: employerContactInfoFailedValidation.CITY_INVALID_MESSAGE,
      });
    });
  });
});
