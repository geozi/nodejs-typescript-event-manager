import { validateSync } from "class-validator";
import { Activity } from "entities/primary/Activity";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import {
  invalidActivityInputs,
  validActivityInputs,
  validCommonInputs,
} from "spec/testInputs";

describe("Activity entity validation tests", () => {
  let mockActivity: Partial<Activity>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockActivity = new Activity();
      mockActivity.id = validCommonInputs.id;
      mockActivity.title = validActivityInputs.title;
      mockActivity.description = validActivityInputs.description;
      mockActivity.activityType = validActivityInputs.activityType;
      mockActivity.createdAt = validCommonInputs.createdAt;
      mockActivity.updatedAt = validCommonInputs.updatedAt;
      mockActivity.events = validActivityInputs.events;
    });

    it("activity has valid inputs", () => {
      const errors = validateSync(mockActivity);

      expect(errors.length).toEqual(0);
      expect({ ...mockActivity }).toEqual({
        id: validCommonInputs.id,
        ...validActivityInputs,
        createdAt: validCommonInputs.createdAt,
        updatedAt: validCommonInputs.updatedAt,
        events: validActivityInputs.events,
      });
    });
  });

  describe("Negative scenarios", () => {
    beforeEach(() => {
      // Mocks
      mockActivity = new Activity();
      mockActivity.id = validCommonInputs.id;
      mockActivity.title = validActivityInputs.title;
      mockActivity.description = validActivityInputs.description;
      mockActivity.activityType = validActivityInputs.activityType;
    });

    it("title is undefined", () => {
      mockActivity.title = undefined;

      const errors = validateSync(mockActivity);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: activityFailedValidation.TITLE_REQUIRED_MESSAGE,
        isString: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE,
        minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
        maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    it("title is too short", () => {
      mockActivity.title = invalidActivityInputs.TITLE_TOO_SHORT;

      const errors = validateSync(mockActivity);

      expect(errors[0].value).toEqual(invalidActivityInputs.TITLE_TOO_SHORT);
      expect(errors[0].constraints).toEqual({
        minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("title is too long", () => {
      mockActivity.title = invalidActivityInputs.TITLE_TOO_LONG;

      const errors = validateSync(mockActivity);

      expect(errors[0].value).toEqual(invalidActivityInputs.TITLE_TOO_LONG);
      expect(errors[0].constraints).toEqual({
        maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    it("description is undefined", () => {
      mockActivity.description = undefined;

      const errors = validateSync(mockActivity);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: activityFailedValidation.DESCRIPTION_REQUIRED_MESSAGE,
        isString: activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
        minLength:
          activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
        maxLength:
          activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    it("description is too short", () => {
      mockActivity.description = invalidActivityInputs.DESCRIPTION_TOO_SHORT;

      const errors = validateSync(mockActivity);

      expect(errors[0].value).toEqual(
        invalidActivityInputs.DESCRIPTION_TOO_SHORT
      );
      expect(errors[0].constraints).toEqual({
        minLength:
          activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("description is too long", () => {
      mockActivity.description = invalidActivityInputs.DESCRIPTION_TOO_LONG;

      const errors = validateSync(mockActivity);

      expect(errors[0].value).toEqual(
        invalidActivityInputs.DESCRIPTION_TOO_LONG
      );
      expect(errors[0].constraints).toEqual({
        maxLength:
          activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    it("activityType is undefined", () => {
      mockActivity.activityType = undefined;

      const errors = validateSync(mockActivity);

      expect(errors[0].value).toEqual(undefined);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: activityFailedValidation.ACTIVITY_TYPE_REQUIRED_MESSAGE,
        isEnum: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
      });
    });
  });
});
