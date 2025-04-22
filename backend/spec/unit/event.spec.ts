import { validateSync } from "class-validator";
import { Event } from "entities/primary/Event";
import { eventFailedValidation } from "messages/validation/eventValidationMessages";
import {
  invalidEventInputs,
  validCommonInputs,
  validEventInputs,
} from "spec/testInputs";

describe("Event entity validation tests", () => {
  let mockEvent: Partial<Event>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockEvent = new Event();
      mockEvent.id = validCommonInputs.id;
      mockEvent.name = validEventInputs.name;
      mockEvent.summary = validEventInputs.summary;
      mockEvent.startingDate = validEventInputs.startingDate;
      mockEvent.endingDate = validEventInputs.endingDate;
      mockEvent.status = validEventInputs.status;
      mockEvent.createdAt = validCommonInputs.createdAt;
      mockEvent.updatedAt = validCommonInputs.updatedAt;
      mockEvent.employers = validEventInputs.employers;
      mockEvent.staffMembers = validEventInputs.staffMembers;
      mockEvent.activities = validEventInputs.activities;
      mockEvent.clients = validEventInputs.clients;
    });

    it("event has valid inputs", () => {
      const errors = validateSync(mockEvent);

      expect(errors.length).toEqual(0);
      expect({ ...mockEvent }).toEqual({
        id: validCommonInputs.id,
        ...validEventInputs,
        createdAt: validCommonInputs.createdAt,
        updatedAt: validCommonInputs.updatedAt,
      });
    });
  });

  describe("Negative scenarios", () => {
    beforeEach(() => {
      // Mocks
      mockEvent = new Event();
      mockEvent.id = validCommonInputs.id;
      mockEvent.name = validEventInputs.name;
      mockEvent.summary = validEventInputs.summary;
      mockEvent.startingDate = validEventInputs.startingDate;
      mockEvent.endingDate = validEventInputs.endingDate;
      mockEvent.status = validEventInputs.status;
      mockEvent.createdAt = validCommonInputs.createdAt;
      mockEvent.updatedAt = validCommonInputs.updatedAt;
    });

    it("name is undefined", () => {
      mockEvent.name = undefined;

      const errors = validateSync(mockEvent);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: eventFailedValidation.NAME_REQUIRED_MESSAGE,
        isString: eventFailedValidation.NAME_INVALID_TYPE_MESSAGE,
        minLength: eventFailedValidation.NAME_BELOW_MIN_MESSAGE,
        maxLength: eventFailedValidation.NAME_ABOVE_MAX_MESSAGE,
      });
    });

    it("name is too short", () => {
      mockEvent.name = invalidEventInputs.NAME_TOO_SHORT;

      const errors = validateSync(mockEvent);

      expect(errors[0].value).toEqual(invalidEventInputs.NAME_TOO_SHORT);
      expect(errors[0].constraints).toEqual({
        minLength: eventFailedValidation.NAME_BELOW_MIN_MESSAGE,
      });
    });

    it("name is too long", () => {
      mockEvent.name = invalidEventInputs.NAME_TOO_LONG;

      const errors = validateSync(mockEvent);

      expect(errors[0].value).toEqual(invalidEventInputs.NAME_TOO_LONG);
      expect(errors[0].constraints).toEqual({
        maxLength: eventFailedValidation.NAME_ABOVE_MAX_MESSAGE,
      });
    });

    it("summary is undefined", () => {
      mockEvent.summary = undefined;

      const errors = validateSync(mockEvent);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: eventFailedValidation.SUMMARY_REQUIRED_MESSAGE,
        isString: eventFailedValidation.SUMMARY_INVALID_TYPE_MESSAGE,
        minLength: eventFailedValidation.SUMMARY_BELOW_MIN_MESSAGE,
        maxLength: eventFailedValidation.SUMMARY_ABOVE_MAX_MESSAGE,
      });
    });

    it("summary is too short", () => {
      mockEvent.summary = invalidEventInputs.SUMMARY_TOO_SHORT;

      const errors = validateSync(mockEvent);

      expect(errors[0].value).toEqual(invalidEventInputs.SUMMARY_TOO_SHORT);
      expect(errors[0].constraints).toEqual({
        minLength: eventFailedValidation.SUMMARY_BELOW_MIN_MESSAGE,
      });
    });

    it("summary is too long", () => {
      mockEvent.summary = invalidEventInputs.SUMMARY_TOO_LONG;

      const errors = validateSync(mockEvent);

      expect(errors[0].value).toEqual(invalidEventInputs.SUMMARY_TOO_LONG);
      expect(errors[0].constraints).toEqual({
        maxLength: eventFailedValidation.SUMMARY_ABOVE_MAX_MESSAGE,
      });
    });

    it("status is undefined", () => {
      mockEvent.status = undefined;

      const errors = validateSync(mockEvent);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: eventFailedValidation.STATUS_REQUIRED_MESSAGE,
        isEnum: eventFailedValidation.STATUS_INVALID_MESSAGE,
      });
    });

    it("status is invalid", () => {
      mockEvent.status = invalidEventInputs.STATUS_INVALID;

      const errors = validateSync(mockEvent);

      expect(errors[0].value).toEqual(invalidEventInputs.STATUS_INVALID);
      expect(errors[0].constraints).toEqual({
        isEnum: eventFailedValidation.STATUS_INVALID_MESSAGE,
      });
    });
  });
});
