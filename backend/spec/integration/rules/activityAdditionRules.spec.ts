import { Request, Response } from "express";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { catchExpressValidationErrors } from "middleware/catchers/expressErrorCatcher";
import { activityAdditionRules } from "middleware/rules/activityRules";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import {
  invalidActivityInputs,
  invalidCommonInputs,
  validActivityInputs,
} from "spec/testInputs";

describe("Activity addition rules: integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  const activityAdditionArray = [
    ...activityAdditionRules(),
    catchExpressValidationErrors,
  ];

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Reset stubs and spies
      sinon.restore();

      // Stubs and spies
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };
      next = sinon.spy();

      // HTTP request
      req = {
        method: "POST",
        body: JSON.parse(
          JSON.stringify({
            title: validActivityInputs.title,
            description: validActivityInputs.description,
            activityType: validActivityInputs.activityType.toString(),
          })
        ),
      };
    });

    it("request has valid inputs", async () => {
      for (const middleware of activityAdditionArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.notCalled).toBeTrue();
      expect(jsonSpy.notCalled).toBeTrue();
    });
  });

  describe("Negative scenarios", () => {
    beforeEach(() => {
      // Reset stubs and spies
      sinon.restore();

      // Stubs and spies
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };
      next = sinon.spy();

      // HTTP request
      req = {
        method: "POST",
        body: JSON.parse(
          JSON.stringify({
            title: validActivityInputs.title,
            description: validActivityInputs.description,
            activityType: validActivityInputs.activityType.toString(),
          })
        ),
      };
    });

    invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, inputRequiredCase]) => {
        it("title" + testName, async () => {
          req.body.title = inputRequiredCase;

          for (const middleware of activityAdditionArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
          expect(
            jsonSpy.calledWith({
              errors: [
                { message: activityFailedValidation.TITLE_REQUIRED_MESSAGE },
              ],
            })
          ).toBeTrue();
        });
      }
    );

    invalidCommonInputs.INVALID_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, invalidInput]) => {
        it("title" + testName, async () => {
          req.body.title = invalidInput;

          for (const middleware of activityAdditionArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
          expect(
            jsonSpy.calledWith({
              errors: [
                {
                  message: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE,
                },
              ],
            })
          ).toBeTrue();
        });
      }
    );

    it("title is too short", async () => {
      req.body.title = invalidActivityInputs.TITLE_TOO_SHORT;

      for (const middleware of activityAdditionArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [
            {
              message: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });

    it("title is too long", async () => {
      req.body.title = invalidActivityInputs.TITLE_TOO_LONG;

      for (const middleware of activityAdditionArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [
            {
              message: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });

    invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, inputRequiredCase]) => {
        it("description" + testName, async () => {
          req.body.description = inputRequiredCase;

          for (const middleware of activityAdditionArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
          expect(
            jsonSpy.calledWith({
              errors: [
                {
                  message:
                    activityFailedValidation.DESCRIPTION_REQUIRED_MESSAGE,
                },
              ],
            })
          ).toBeTrue();
        });
      }
    );

    invalidCommonInputs.INVALID_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, invalidInput]) => {
        it("description" + testName, async () => {
          req.body.description = invalidInput;

          for (const middleware of activityAdditionArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
          expect(
            jsonSpy.calledWith({
              errors: [
                {
                  message:
                    activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
                },
              ],
            })
          ).toBeTrue();
        });
      }
    );

    it("description is too short", async () => {
      req.body.description = invalidActivityInputs.DESCRIPTION_TOO_SHORT;

      for (const middleware of activityAdditionArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [
            {
              message:
                activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });

    it("description is too long", async () => {
      req.body.description = invalidActivityInputs.DESCRIPTION_TOO_LONG;

      for (const middleware of activityAdditionArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [
            {
              message:
                activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });

    invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, inputRequiredCase]) => {
        it("activityType" + testName, async () => {
          req.body.activityType = inputRequiredCase;

          for (const middleware of activityAdditionArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
          expect(
            jsonSpy.calledWith({
              errors: [
                {
                  message:
                    activityFailedValidation.ACTIVITY_TYPE_REQUIRED_MESSAGE,
                },
              ],
            })
          ).toBeTrue();
        });
      }
    );

    invalidCommonInputs.INVALID_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, invalidInput]) => {
        it("activityType" + testName, async () => {
          req.body.activityType = invalidInput;

          for (const middleware of activityAdditionArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
          expect(
            jsonSpy.calledWith({
              errors: [
                {
                  message:
                    activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
                },
              ],
            })
          ).toBeTrue();
        });
      }
    );

    it("activityType is not enum member", async () => {
      req.body.activityType =
        invalidActivityInputs.ACTIVITY_TYPE_INVALID.toString();

      for (const middleware of activityAdditionArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [
            {
              message:
                activityFailedValidation.ACTIVITY_TYPE_WRONG_ENUM_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });
  });
});
