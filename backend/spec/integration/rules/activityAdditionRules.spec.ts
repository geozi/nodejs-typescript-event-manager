import { Request, Response } from "express";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { catchExpressValidationErrors } from "middleware/catchers/expressErrorCatcher";
import { activityAdditionRules } from "middleware/rules/activityRules";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { invalidActivityInputs, validActivityInputs } from "spec/testInputs";

describe("Activity addition rules: integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let mockNumericValue: number;
  const activityAdditionArray = [
    ...activityAdditionRules(),
    catchExpressValidationErrors,
  ];

  describe("Positive scenarios", () => {
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

      // Mocks
      mockNumericValue = 1;

      // HTTP request
      req = {
        body: JSON.parse(
          JSON.stringify({
            title: validActivityInputs.title,
            description: validActivityInputs.description,
            activityType: validActivityInputs.activityType.toString(),
          })
        ),
      };
    });

    it("title is undefined", async () => {
      req.body.title = undefined;

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

    it("title is not a string", async () => {
      req.body.title = mockNumericValue;

      for (const middleware of activityAdditionArray) {
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

    it("description is undefined", async () => {
      req.body.description = undefined;

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
              message: activityFailedValidation.DESCRIPTION_REQUIRED_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });

    it("description is not a string", async () => {
      req.body.description = mockNumericValue;

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

    it("activityType is undefined", async () => {
      req.body.activityType = undefined;

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
              message: activityFailedValidation.ACTIVITY_TYPE_REQUIRED_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });

    it("activityType is invalid", async () => {
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
              message: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });
  });
});
