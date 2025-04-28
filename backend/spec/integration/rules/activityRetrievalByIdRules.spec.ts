import { Request, Response } from "express";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { catchExpressValidationErrors } from "middleware/catchers/expressErrorCatcher";
import { activityRetrievalByIdRules } from "middleware/rules/activityRules";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { invalidCommonInputs, validCommonInputs } from "spec/testInputs";

describe("Activity retrieval by ID rules: integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let mockId: number;
  const activityRetrievalArray = [
    ...activityRetrievalByIdRules(),
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
      mockId = validCommonInputs.id;

      // HTTP request
      req = { method: "GET", body: JSON.parse(JSON.stringify({ id: mockId })) };
    });

    it("request has valid ID", async () => {
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
      mockId = validCommonInputs.id;

      // HTTP request
      req = { method: "GET", body: JSON.parse(JSON.stringify({ id: mockId })) };
    });

    it("id is undefined", async () => {
      req.body.id = undefined;

      for (const middleware of activityRetrievalArray) {
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

    it("id is invalid", async () => {
      req.body.id = invalidCommonInputs.ID_INVALID_TYPE;

      for (const middleware of activityRetrievalArray) {
        await middleware(req as Request, res as Response, next);
      }

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
      expect(
        jsonSpy.calledWith({
          errors: [{ message: commonFailedValidation.ID_INVALID_TYPE_MESSAGE }],
        })
      ).toBeTrue();
    });

    it("id is negative", async () => {
      req.body.id = invalidCommonInputs.ID_NEGATIVE;

      for (const middleware of activityRetrievalArray) {
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
  });
});
