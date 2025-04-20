import { validateSync } from "class-validator";
import { Participant } from "entities/Participant";
import { EmploymentStatus } from "enums/EmploymentStatus";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { participantFailedValidation } from "messages/validation/participantValidationMessages";
import {
  invalidCommonInputs,
  invalidParticipantInputs,
  validCommonInputs,
  validParticipantInputs,
} from "spec/testInputs";

describe("Participant entity validation tests", () => {
  let mockParticipant: Partial<Participant>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockParticipant = new Participant();
      mockParticipant.id = validCommonInputs.id;
      mockParticipant.firstName = validCommonInputs.firstName;
      mockParticipant.lastName = validCommonInputs.lastName;
      mockParticipant.email = validCommonInputs.email;
      mockParticipant.phoneNumber = validCommonInputs.phoneNumber;
      mockParticipant.employmentStatus =
        validParticipantInputs.employmentStatus;
      mockParticipant.ticketID = validParticipantInputs.ticketId;
    });

    it("participant has valid inputs", () => {
      const errors = validateSync(mockParticipant);

      expect(errors.length).toEqual(0);
      expect(mockParticipant.toString()).toEqual(
        validParticipantInputs.toString()
      );
    });
  });

  describe("Negative scenarios", () => {
    beforeEach(() => {
      // Mocks
      mockParticipant = new Participant();
      mockParticipant.id = validCommonInputs.id;
      mockParticipant.firstName = validCommonInputs.firstName;
      mockParticipant.lastName = validCommonInputs.lastName;
      mockParticipant.email = validCommonInputs.email;
      mockParticipant.phoneNumber = validCommonInputs.phoneNumber;
      mockParticipant.employmentStatus =
        validParticipantInputs.employmentStatus;
      mockParticipant.ticketID = validParticipantInputs.ticketId;
    });

    it("firstName is undefined", () => {
      mockParticipant.firstName = undefined;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.FIRST_NAME_REQUIRED_MESSAGE,
        isString: commonFailedValidation.FIRST_NAME_INVALID_TYPE_MESSAGE,
        isAlpha: commonFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("firstName is invalid", () => {
      mockParticipant.firstName = invalidCommonInputs.FIRST_NAME_INVALID;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(invalidCommonInputs.FIRST_NAME_INVALID);
      expect(errors[0].constraints).toEqual({
        isAlpha: commonFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("lastName is undefined", () => {
      mockParticipant.lastName = undefined;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.LAST_NAME_REQUIRED_MESSAGE,
        isString: commonFailedValidation.LAST_NAME_INVALID_TYPE_MESSAGE,
        isAlpha: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("lastName is invalid", () => {
      mockParticipant.lastName = invalidCommonInputs.LAST_NAME_INVALID;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(invalidCommonInputs.LAST_NAME_INVALID);
      expect(errors[0].constraints).toEqual({
        isAlpha: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
      });
    });

    it("email is undefined", () => {
      mockParticipant.email = undefined;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.EMAIL_REQUIRED_MESSAGE,
        isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
      });
    });

    invalidCommonInputs.EMAIL_INVALID_CASES.forEach(
      ([testName, invalidEmail]) => {
        it(testName, () => {
          mockParticipant.email = invalidEmail;

          const errors = validateSync(mockParticipant);

          expect(errors[0].value).toEqual(invalidEmail);
          expect(errors[0].constraints).toEqual({
            isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
          });
        });
      }
    );

    it("phoneNumber is undefined", () => {
      mockParticipant.phoneNumber = undefined;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: commonFailedValidation.PHONE_NUMBER_REQUIRED,
        isString: commonFailedValidation.PHONE_NUMBER_INVALID_TYPE_MESSAGE,
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber is too short", () => {
      mockParticipant.phoneNumber = invalidCommonInputs.PHONE_NUMBER_TOO_SHORT;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_TOO_SHORT
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber is too long", () => {
      mockParticipant.phoneNumber = invalidCommonInputs.PHONE_NUMBER_TOO_LONG;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_TOO_LONG
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("phoneNumber is invalid", () => {
      mockParticipant.phoneNumber =
        invalidCommonInputs.PHONE_NUMBER_INVALID_FORMAT;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(
        invalidCommonInputs.PHONE_NUMBER_INVALID_FORMAT
      );
      expect(errors[0].constraints).toEqual({
        matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
      });
    });

    it("employmentStatus is undefined", () => {
      mockParticipant.employmentStatus = undefined;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty:
          participantFailedValidation.EMPLOYMENT_STATUS_REQUIRED_MESSAGE,
        isEnum: participantFailedValidation.EMPLOYMENT_STATUS_INVALID_MESSAGE,
      });
    });

    it("employmentStatus is invalid", () => {
      mockParticipant.employmentStatus =
        invalidParticipantInputs.EMPLOYMENT_STATUS_INVALID as EmploymentStatus;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(
        invalidParticipantInputs.EMPLOYMENT_STATUS_INVALID as EmploymentStatus
      );
      expect(errors[0].constraints).toEqual({
        isEnum: participantFailedValidation.EMPLOYMENT_STATUS_INVALID_MESSAGE,
      });
    });

    it("ticketId is undefined", () => {
      mockParticipant.ticketID = undefined;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: participantFailedValidation.TICKET_ID_REQUIRED_MESSAGE,
        isString: participantFailedValidation.TICKET_ID_INVALID_TYPE_MESSAGE,
        matches: participantFailedValidation.TICKET_ID_INVALID_FORMAT_MESSAGE,
      });
    });

    it("ticketId is invalid", () => {
      mockParticipant.ticketID = invalidParticipantInputs.TICKET_ID_INVALID;

      const errors = validateSync(mockParticipant);

      expect(errors[0].value).toEqual(
        invalidParticipantInputs.TICKET_ID_INVALID
      );
      expect(errors[0].constraints).toEqual({
        matches: participantFailedValidation.TICKET_ID_INVALID_FORMAT_MESSAGE,
      });
    });
  });
});
