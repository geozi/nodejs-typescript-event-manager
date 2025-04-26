import { Request, Response } from "express";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { catchExpressValidationErrors } from "middleware/catchers/expressErrorCatcher";
import { activityRetrievalByTypeRules } from "middleware/rules/activityRules";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { invalidActivityInputs, validActivityInputs } from "spec/testInputs";

describe("Activity retrieval by type rules: integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let mockActivityType: string;
  const activityRetrievalArray = [
    ...activityRetrievalByTypeRules(),
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

      // Mocks
      mockActivityType = validActivityInputs.activityType.toString();

      // HTTP request
      req = {
        body: JSON.parse(JSON.stringify({ activityType: mockActivityType })),
      };
    });

    it("request has valid activityType", async () => {
      for (const middleware of activityRetrievalArray) {
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
      mockActivityType = validActivityInputs.activityType.toString();

      // HTTP request
      req = {
        body: JSON.parse(JSON.stringify({ activityType: mockActivityType })),
      };
    });

    it("activityType is undefined", async () => {
      req.body.activityType = undefined;

      for (const middleware of activityRetrievalArray) {
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

      for (const middleware of activityRetrievalArray) {
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
