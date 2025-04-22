import { validateSync } from "class-validator";
import { User } from "entities/primary/User";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { userFailedValidation } from "messages/validation/userValidationMessages";
import {
  invalidCommonInputs,
  invalidUserInputs,
  validCommonInputs,
  validUserInput,
} from "spec/testInputs";

describe("User entity validation tests", () => {
  let mockUser: Partial<User>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockUser = new User();
      mockUser.id = validCommonInputs.id;
      mockUser.username = validUserInput.username;
      mockUser.email = validUserInput.email;
      mockUser.password = validUserInput.password;
      mockUser.role = validUserInput.role;
      mockUser.createdAt = validCommonInputs.createdAt;
      mockUser.updatedAt = validCommonInputs.updatedAt;
    });

    it("user has valid inputs", () => {
      const errors = validateSync(mockUser);

      expect(errors.length).toEqual(0);
      expect({ ...mockUser }).toEqual({
        id: validCommonInputs.id,
        ...validUserInput,
        createdAt: validCommonInputs.createdAt,
        updatedAt: validCommonInputs.updatedAt,
      });
    });
  });

  describe("Negative scenarios", () => {
    beforeEach(() => {
      // Mocks
      mockUser = new User();
      mockUser.id = validCommonInputs.id;
      mockUser.username = validUserInput.username;
      mockUser.email = validUserInput.email;
      mockUser.password = validUserInput.password;
      mockUser.role = validUserInput.role;
      mockUser.createdAt = validCommonInputs.createdAt;
      mockUser.updatedAt = validCommonInputs.updatedAt;
    });

    it("username is undefined", () => {
      mockUser.username = undefined;

      const errors = validateSync(mockUser);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: userFailedValidation.USERNAME_REQUIRED_MESSAGE,
        isString: userFailedValidation.USERNAME_INVALID_TYPE_MESSAGE,
        minLength: userFailedValidation.USERNAME_BELOW_MIN_MESSAGE,
        maxLength: userFailedValidation.USERNAME_ABOVE_MAX_MESSAGE,
      });
    });

    it("username is too short", () => {
      mockUser.username = invalidUserInputs.TOO_SHORT_USERNAME;

      const errors = validateSync(mockUser);

      expect(errors[0].value).toEqual(invalidUserInputs.TOO_SHORT_USERNAME);
      expect(errors[0].constraints).toEqual({
        minLength: userFailedValidation.USERNAME_BELOW_MIN_MESSAGE,
      });
    });

    it("username is too long", () => {
      mockUser.username = invalidUserInputs.TOO_LONG_USERNAME;

      const errors = validateSync(mockUser);

      expect(errors[0].value).toEqual(invalidUserInputs.TOO_LONG_USERNAME);
      expect(errors[0].constraints).toEqual({
        maxLength: userFailedValidation.USERNAME_ABOVE_MAX_MESSAGE,
      });
    });

    it("email is undefined", () => {
      mockUser.email = undefined;

      const errors = validateSync(mockUser);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.EMAIL_REQUIRED_MESSAGE,
        isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
      });
    });

    invalidCommonInputs.EMAIL_INVALID_CASES.forEach(
      ([testName, invalidEmail]) => {
        it(testName, () => {
          mockUser.email = invalidEmail;
          const errors = validateSync(mockUser);

          expect(errors[0].value).toEqual(invalidEmail);
          expect(errors[0].constraints).toEqual({
            isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
          });
        });
      }
    );

    it("password is undefined", () => {
      mockUser.password = undefined;

      const errors = validateSync(mockUser);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: userFailedValidation.PASSWORD_REQUIRED_MESSAGE,
        isString: userFailedValidation.PASSWORD_INVALID_TYPE_MESSAGE,
        minLength: userFailedValidation.PASSWORD_BELOW_MIN_MESSAGE,
        matches: userFailedValidation.PASSWORD_INVALID_FORMAT_MESSAGE,
      });
    });

    it("password is too short", () => {
      mockUser.password = invalidUserInputs.TOO_SHORT_PASSWORD;

      const errors = validateSync(mockUser);

      expect(errors[0].value).toEqual(invalidUserInputs.TOO_SHORT_PASSWORD);
      expect(errors[0].constraints).toEqual({
        minLength: userFailedValidation.PASSWORD_BELOW_MIN_MESSAGE,
      });
    });

    invalidUserInputs.PASSWORD_INVALID_CASES.forEach(
      ([testName, invalidPassword]) => {
        it(testName, () => {
          mockUser.password = invalidPassword;

          const errors = validateSync(mockUser);

          expect(errors[0].value).toEqual(invalidPassword);
          expect(errors[0].constraints).toEqual({
            matches: userFailedValidation.PASSWORD_INVALID_FORMAT_MESSAGE,
          });
        });
      }
    );

    it("role is undefined", () => {
      mockUser.role = undefined;

      const errors = validateSync(mockUser);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: userFailedValidation.ROLE_REQUIRED_MESSAGE,
        isEnum: userFailedValidation.ROLE_INVALID_MESSAGE,
      });
    });

    it("role is invalid", () => {
      mockUser.role = invalidUserInputs.ROLE_INVALID;

      const errors = validateSync(mockUser);

      expect(errors[0].value).toEqual(invalidUserInputs.ROLE_INVALID);
      expect(errors[0].constraints).toEqual({
        isEnum: userFailedValidation.ROLE_INVALID_MESSAGE,
      });
    });
  });
});
