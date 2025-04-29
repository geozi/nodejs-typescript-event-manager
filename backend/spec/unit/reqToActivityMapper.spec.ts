import { validate, ValidationError } from "class-validator";
import { Activity } from "entities/primary/Activity";
import { ActivityType } from "enums/ActivityType";
import { Request } from "express";
import { reqToActivity } from "mappers/activityMapper";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import sinon, { SinonSpy } from "sinon";
import {
  invalidActivityInputs,
  invalidCommonInputs,
  validActivityInputs,
} from "spec/testInputs";

describe(`${reqToActivity.name} mapper unit tests`, () => {
  let req: Partial<Request>;
  let validateSpy: SinonSpy;

  beforeEach(() => {
    // Reset spies
    sinon.restore();

    // Spies
    validateSpy = sinon.spy(validate);

    // HTTP request
    req = {
      method: "POST",
      body: JSON.parse(
        JSON.stringify({
          title: validActivityInputs.title,
          description: validActivityInputs.description,
          activityType: ActivityType.Workshop.toString(),
        })
      ),
    };
  });

  describe("Positive scenario", () => {
    it("request has valid inputs", async () => {
      const newActivity = reqToActivity(req as Request);
      const errors = await validateSpy(newActivity);

      expect(newActivity).toBeInstanceOf(Activity);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(errors.length).toEqual(0);
    });
  });

  describe("Negative scenarios", () => {
    invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, inputRequiredCase]) => {
        it("title" + testName, async () => {
          req.body.title = inputRequiredCase;

          const newActivity = reqToActivity(req as Request);
          const errors = await validateSpy(newActivity);

          expect(newActivity).toBeInstanceOf(Activity);
          expect(validateSpy.calledOnce).toBeTrue();
          expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
          expect(errors).toEqual([jasmine.any(ValidationError)]);
          expect(errors[0].constraints).toEqual({
            isNotEmpty: activityFailedValidation.TITLE_REQUIRED_MESSAGE,
            isString: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE,
            maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
            minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
          });
        });
      }
    );

    invalidCommonInputs.INVALID_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, invalidInput]) => {
        it("title" + testName, async () => {
          req.body.title = invalidInput;

          const newActivity = reqToActivity(req as Request);
          const errors = await validateSpy(newActivity);

          expect(newActivity).toBeInstanceOf(Activity);
          expect(validateSpy.calledOnce).toBeTrue();
          expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
          expect(errors).toEqual([jasmine.any(ValidationError)]);
          expect(errors[0].constraints).toEqual({
            isString: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE,
            maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
            minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
          });
        });
      }
    );

    it("title is too short", async () => {
      req.body.title = invalidActivityInputs.TITLE_TOO_SHORT;

      const newActivity = reqToActivity(req as Request);
      const errors = await validateSpy(newActivity);

      expect(newActivity).toBeInstanceOf(Activity);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("title is too long", async () => {
      req.body.title = invalidActivityInputs.TITLE_TOO_LONG;

      const newActivity = reqToActivity(req as Request);
      const errors = await validateSpy(newActivity);

      expect(newActivity).toBeInstanceOf(Activity);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, inputRequiredCase]) => {
        it("description" + testName, async () => {
          req.body.description = inputRequiredCase;

          const newActivity = reqToActivity(req as Request);
          const errors = await validateSpy(newActivity);

          expect(newActivity).toBeInstanceOf(Activity);
          expect(validateSpy.calledOnce).toBeTrue();
          expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
          expect(errors).toEqual([jasmine.any(ValidationError)]);
          expect(errors[0].constraints).toEqual({
            isNotEmpty: activityFailedValidation.DESCRIPTION_REQUIRED_MESSAGE,
            isString: activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
            minLength:
              activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
            maxLength:
              activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
          });
        });
      }
    );

    invalidCommonInputs.INVALID_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, invalidInput]) => {
        it("description" + testName, async () => {
          req.body.description = invalidInput;

          const newActivity = reqToActivity(req as Request);
          const errors = await validateSpy(newActivity);

          expect(newActivity).toBeInstanceOf(Activity);
          expect(validateSpy.calledOnce).toBeTrue();
          expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
          expect(errors).toEqual([jasmine.any(ValidationError)]);
          expect(errors[0].constraints).toEqual({
            isString: activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
            minLength:
              activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
            maxLength:
              activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
          });
        });
      }
    );

    it("description is too short", async () => {
      req.body.description = invalidActivityInputs.DESCRIPTION_TOO_SHORT;

      const newActivity = reqToActivity(req as Request);
      const errors = await validateSpy(newActivity);

      expect(newActivity).toBeInstanceOf(Activity);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        minLength:
          activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("description is too long", async () => {
      req.body.description = invalidActivityInputs.DESCRIPTION_TOO_LONG;

      const newActivity = reqToActivity(req as Request);
      const errors = await validateSpy(newActivity);

      expect(newActivity).toBeInstanceOf(Activity);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        maxLength:
          activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, inputRequiredCase]) => {
        it("activityType" + testName, async () => {
          req.body.activityType = inputRequiredCase;

          const newActivity = reqToActivity(req as Request);
          const errors = await validateSpy(newActivity);

          expect(newActivity).toBeInstanceOf(Activity);
          expect(validateSpy.calledOnce).toBeTrue();
          expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
          expect(errors).toEqual([jasmine.any(ValidationError)]);
          expect(errors[0].constraints).toEqual({
            isNotEmpty: activityFailedValidation.ACTIVITY_TYPE_REQUIRED_MESSAGE,
            isEnum: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
          });
        });
      }
    );

    invalidCommonInputs.INVALID_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, invalidInput]) => {
        it("activityType" + testName, async () => {
          req.body.activityType = invalidInput;

          const newActivity = reqToActivity(req as Request);
          const errors = await validateSpy(newActivity);

          expect(newActivity).toBeInstanceOf(Activity);
          expect(validateSpy.calledOnce).toBeTrue();
          expect(validateSpy.calledWithExactly(newActivity)).toBeTrue();
          expect(errors).toEqual([jasmine.any(ValidationError)]);
          expect(errors[0].constraints).toEqual({
            isEnum: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
          });
        });
      }
    );
  });
});
