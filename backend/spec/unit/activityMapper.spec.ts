import { validate, ValidationError } from "class-validator";
import { ActivityUpdateDTO } from "dto/ActivityUpdateDTO";
import { Activity } from "entities/primary/Activity";
import { ActivityType } from "enums/ActivityType";
import { Request } from "express";
import { reqToActivity, reqToActivityUpdateDTO } from "mappers/activityMapper";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import sinon, { SinonSpy } from "sinon";
import {
  invalidActivityInputs,
  invalidCommonInputs,
  validActivityInputs,
} from "spec/testInputs";

describe("Activity mapper unit tests", () => {
  let req: Partial<Request>;
  let validateSpy: SinonSpy;
  let mockNumericValue: number;

  describe(`${reqToActivity.name}`, () => {
    beforeEach(() => {
      // Reset spies
      sinon.restore();

      // Spies
      validateSpy = sinon.spy(validate);

      // Mocks
      mockNumericValue = 1;

      // HTTP request
      req = {
        body: JSON.parse(
          JSON.stringify({
            title: validActivityInputs.title,
            description: validActivityInputs.description,
            activityType: ActivityType.Workshop.toString(),
          })
        ),
      };
    });

    it("request has valid inputs", async () => {
      const newActivity = reqToActivity(req as Request);
      const errors = await validateSpy(newActivity);

      expect(newActivity).toBeInstanceOf(Activity);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(errors.length).toEqual(0);
    });

    it("title is undefined", async () => {
      req.body.title = undefined;

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

    it("title is not a string", async () => {
      req.body.title = mockNumericValue;

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

    it("description is undefined", async () => {
      req.body.description = undefined;

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

    it("description is not a string", async () => {
      req.body.description = mockNumericValue;

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

    it("activityType is undefined", async () => {
      req.body.activityType = undefined;

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

    it("activityType is invalid", async () => {
      req.body.activityType = invalidActivityInputs.ACTIVITY_TYPE_INVALID;

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
  });

  describe(`${reqToActivityUpdateDTO.name}`, () => {
    beforeEach(() => {
      // Reset spies
      sinon.restore();

      // Spies
      validateSpy = sinon.spy(validate);

      // Mocks
      mockNumericValue = 1;

      // HTTP request
      req = {
        body: JSON.parse(
          JSON.stringify({
            id: mockNumericValue,
            title: validActivityInputs.title,
            description: validActivityInputs.description,
            activityType: ActivityType.Workshop.toString(),
          })
        ),
      };
    });

    it("request has valid inputs", async () => {
      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(errors.length).toEqual(0);
    });

    invalidCommonInputs.ID_REQUIRED_CASES.forEach(
      ([testName, idRequiredCase]) => {
        it(testName, async () => {
          req.body.id = idRequiredCase;

          const activityToUpdate = reqToActivityUpdateDTO(req as Request);
          const errors = await validateSpy(activityToUpdate);

          expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
          expect(validateSpy.calledOnce).toBeTrue();
          expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
          expect(errors).toEqual([jasmine.any(ValidationError)]);
          expect(errors[0].constraints).toEqual({
            isNotEmpty: commonFailedValidation.ID_REQUIRED_MESSAGE,
            isInt: commonFailedValidation.ID_INVALID_TYPE_MESSAGE,
            isPositive: commonFailedValidation.ID_NEGATIVE_MESSAGE,
          });
        });
      }
    );

    invalidCommonInputs.ID_INVALID_TYPE_CASES.forEach(
      ([testName, invalidId]) => {
        it(testName, async () => {
          req.body.id = invalidId;

          const activityToUpdate = reqToActivityUpdateDTO(req as Request);
          const errors = await validateSpy(activityToUpdate);

          expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
          expect(validateSpy.calledOnce).toBeTrue();
          expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
          expect(errors).toEqual([jasmine.any(ValidationError)]);
          expect(errors[0].constraints).toEqual({
            isInt: commonFailedValidation.ID_INVALID_TYPE_MESSAGE,
            isPositive: commonFailedValidation.ID_NEGATIVE_MESSAGE,
          });
        });
      }
    );

    it("id is a negative integer", async () => {
      req.body.id = invalidCommonInputs.ID_NEGATIVE;

      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        isPositive: commonFailedValidation.ID_NEGATIVE_MESSAGE,
      });
    });

    it("title is not a string", async () => {
      req.body.title = mockNumericValue;

      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        isString: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE,
        maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
        minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("title is too short", async () => {
      req.body.title = invalidActivityInputs.TITLE_TOO_SHORT;

      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("title is too long", async () => {
      req.body.title = invalidActivityInputs.TITLE_TOO_LONG;

      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    it("description is not a string", async () => {
      req.body.description = mockNumericValue;

      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        isString: activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
        minLength:
          activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
        maxLength:
          activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    it("description is too short", async () => {
      req.body.description = invalidActivityInputs.DESCRIPTION_TOO_SHORT;

      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        minLength:
          activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
      });
    });

    it("description is too long", async () => {
      req.body.description = invalidActivityInputs.DESCRIPTION_TOO_LONG;

      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        maxLength:
          activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
      });
    });

    it("activityType is invalid", async () => {
      req.body.activityType = invalidActivityInputs.ACTIVITY_TYPE_INVALID;

      const activityToUpdate = reqToActivityUpdateDTO(req as Request);
      const errors = await validateSpy(activityToUpdate);

      expect(activityToUpdate).toBeInstanceOf(ActivityUpdateDTO);
      expect(validateSpy.calledOnce).toBeTrue();
      expect(validateSpy.calledWithExactly(activityToUpdate)).toBeTrue();
      expect(errors).toEqual([jasmine.any(ValidationError)]);
      expect(errors[0].constraints).toEqual({
        isEnum: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
      });
    });
  });
});
