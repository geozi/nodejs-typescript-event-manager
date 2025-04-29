import { Request, Response } from "express";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { catchExpressValidationErrors } from "middleware/catchers/expressErrorCatcher";
import { activityUpdateRules } from "middleware/rules/activityRules";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import {
  invalidActivityInputs,
  invalidCommonInputs,
  validActivityInputs,
  validCommonInputs,
} from "spec/testInputs";

describe("Activity update rules: integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let mockNumericValue: number;
  const activityUpdateArray = [
    ...activityUpdateRules(),
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
        method: "PUT",
        body: JSON.parse(
          JSON.stringify({
            id: validCommonInputs.id,
            title: validActivityInputs.title,
            description: validActivityInputs.description,
            activityType: validActivityInputs.activityType.toString(),
          })
        ),
      };
    });

    it("request has valid inputs", async () => {
      for (const middleware of activityUpdateArray) {
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

      // Mocks
      mockNumericValue = 1;

      // HTTP request
      req = {
        method: "PUT",
        body: JSON.parse(
          JSON.stringify({
            id: validCommonInputs.id,
            title: validActivityInputs.title,
            description: validActivityInputs.description,
            activityType: validActivityInputs.activityType.toString(),
          })
        ),
      };
    });

    it("id is undefined", async () => {
      req.body.id = undefined;

      for (const middleware of activityUpdateArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [{ message: commonFailedValidation.ID_REQUIRED_MESSAGE }],
        })
      ).toBeTrue();
    });

    invalidCommonInputs.ID_INVALID_TYPE_CASES.forEach(
      ([testName, invalidId]) => {
        it(testName, async () => {
          req.body.id = invalidId;

          for (const middleware of activityUpdateArray) {
            await middleware(req as Request, res as Response, next);
          }

          statusStub = res.status as SinonStub;
          jsonSpy = res.json as SinonSpy;

          expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
          expect(
            jsonSpy.calledWith({
              errors: [
                { message: commonFailedValidation.ID_INVALID_TYPE_MESSAGE },
              ],
            })
          ).toBeTrue();
        });
      }
    );

    it("id is negative", async () => {
      req.body.id = invalidCommonInputs.ID_NEGATIVE;

      for (const middleware of activityUpdateArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [{ message: commonFailedValidation.ID_NEGATIVE_MESSAGE }],
        })
      ).toBeTrue();
    });

    it("title is not a string", async () => {
      req.body.title = mockNumericValue;

      for (const middleware of activityUpdateArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [
            { message: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE },
          ],
        })
      ).toBeTrue();
    });

    it("title is too short", async () => {
      req.body.title = invalidActivityInputs.TITLE_TOO_SHORT;

      for (const middleware of activityUpdateArray) {
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

      for (const middleware of activityUpdateArray) {
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

    it("description is not a string", async () => {
      req.body.description = mockNumericValue;

      for (const middleware of activityUpdateArray) {
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

    it("description is too short", async () => {
      req.body.description = invalidActivityInputs.DESCRIPTION_TOO_SHORT;

      for (const middleware of activityUpdateArray) {
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

      for (const middleware of activityUpdateArray) {
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

    it("activityType is invalid", async () => {
      req.body.activityType =
        invalidActivityInputs.ACTIVITY_TYPE_INVALID.toString();

      for (const middleware of activityUpdateArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [
            {
              message: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });
  });
});
