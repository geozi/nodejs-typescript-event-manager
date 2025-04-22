import { validateSync } from "class-validator";
import { Client } from "entities/primary/Client";
import { clientFailedValidation } from "messages/validation/clientValidationMessages";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import {
  invalidClientInputs,
  invalidCommonInputs,
  validClientInputs,
  validCommonInputs,
} from "spec/testInputs";

describe("Client entity validation tests", () => {
  let mockClient: Partial<Client>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockClient = new Client();
      mockClient.id = validCommonInputs.id;
      mockClient.firstName = validCommonInputs.firstName;
      mockClient.lastName = validCommonInputs.lastName;
      mockClient.email = validCommonInputs.email;
      mockClient.phoneNumber = validCommonInputs.phoneNumber;
      mockClient.employmentStatus = validClientInputs.employmentStatus;
      mockClient.createdAt = validCommonInputs.createdAt;
      mockClient.updatedAt = validCommonInputs.updatedAt;
      mockClient.events = validClientInputs.events;
      mockClient.user = validCommonInputs.user;
    });

    it("client has valid inputs", () => {
      const errors = validateSync(mockClient);

      expect(errors.length).toEqual(0);
      expect({ ...mockClient }).toEqual({
        ...validCommonInputs,
        ...validClientInputs,
      });
    });
  });

  describe("Negative scenarios", () => {
    beforeEach(() => {
      // Mocks
      mockClient = new Client();
      mockClient.id = validCommonInputs.id;
      mockClient.firstName = validCommonInputs.firstName;
      mockClient.lastName = validCommonInputs.lastName;
      mockClient.email = validCommonInputs.email;
      mockClient.phoneNumber = validCommonInputs.phoneNumber;
      mockClient.employmentStatus = validClientInputs.employmentStatus;
    });

    it("firstName is undefined", () => {
      mockClient.firstName = undefined;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.FIRST_NAME_REQUIRED_MESSAGE,
        isString: commonFailedValidation.FIRST_NAME_INVALID_TYPE_MESSAGE,
        isAlpha: commonFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("firstName is invalid", () => {
      mockClient.firstName = invalidCommonInputs.FIRST_NAME_INVALID;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(invalidCommonInputs.FIRST_NAME_INVALID);
      expect(errors[0].constraints).toEqual({
        isAlpha: commonFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("lastName is undefined", () => {
      mockClient.lastName = undefined;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.LAST_NAME_REQUIRED_MESSAGE,
        isString: commonFailedValidation.LAST_NAME_INVALID_TYPE_MESSAGE,
        isAlpha: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("lastName is invalid", () => {
      mockClient.lastName = invalidCommonInputs.LAST_NAME_INVALID;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(invalidCommonInputs.LAST_NAME_INVALID);
      expect(errors[0].constraints).toEqual({
        isAlpha: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("email is undefined", () => {
      mockClient.email = undefined;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.EMAIL_REQUIRED_MESSAGE,
        isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
      });
    });

    invalidCommonInputs.EMAIL_INVALID_CASES.forEach(
      ([testName, invalidEmail]) => {
        it(testName, () => {
          mockClient.email = invalidEmail;

          const errors = validateSync(mockClient);

          expect(errors[0].value).toEqual(invalidEmail);
          expect(errors[0].constraints).toEqual({
            isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
          });
        });
      }
    );

    it("phoneNumber is undefined", () => {
      mockClient.phoneNumber = undefined;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE,
        isString: commonFailedValidation.PHONE_NUMBER_INVALID_TYPE_MESSAGE,
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber is too short", () => {
      mockClient.phoneNumber = invalidCommonInputs.PHONE_NUMBER_TOO_SHORT;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_TOO_SHORT
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber is too long", () => {
      mockClient.phoneNumber = invalidCommonInputs.PHONE_NUMBER_TOO_LONG;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_TOO_LONG
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber is invalid", () => {
      mockClient.phoneNumber = invalidCommonInputs.PHONE_NUMBER_INVALID_FORMAT;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_INVALID_FORMAT
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("employmentStatus is undefined", () => {
      mockClient.employmentStatus = undefined;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: clientFailedValidation.EMPLOYMENT_STATUS_REQUIRED_MESSAGE,
        isEnum: clientFailedValidation.EMPLOYMENT_STATUS_INVALID_MESSAGE,
      });
    });

    it("employmentStatus is invalid", () => {
      mockClient.employmentStatus =
        invalidClientInputs.EMPLOYMENT_STATUS_INVALID;

      const errors = validateSync(mockClient);

      expect(errors[0].value).toEqual(
        invalidClientInputs.EMPLOYMENT_STATUS_INVALID
      );
      expect(errors[0].constraints).toEqual({
        isEnum: clientFailedValidation.EMPLOYMENT_STATUS_INVALID_MESSAGE,
      });
    });
  });
});
