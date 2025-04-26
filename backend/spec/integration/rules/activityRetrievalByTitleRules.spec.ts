import { Request, Response } from "express";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { catchExpressValidationErrors } from "middleware/catchers/expressErrorCatcher";
import { activityRetrievalByTitleRules } from "middleware/rules/activityRules";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import {
  invalidActivityInputs,
  validActivityInputs,
  validCommonInputs,
} from "spec/testInputs";

describe("Activity retrieval by title rules: integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let mockTitle: string;
  let mockNumericValue: number;
  const activityRetrievalArray = [
    ...activityRetrievalByTitleRules(),
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
      mockTitle = validActivityInputs.title;

      // HTTP request
      req = { body: JSON.parse(JSON.stringify({ title: mockTitle })) };
    });

    it("request has valid title", async () => {
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
      mockTitle = validActivityInputs.title;
      mockNumericValue = validCommonInputs.id;

      // HTTP request
      req = { body: JSON.parse(JSON.stringify({ title: mockTitle })) };
    });

    it("title is undefined", async () => {
      req.body.title = undefined;

      for (const middleware of activityRetrievalArray) {
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

      for (const middleware of activityRetrievalArray) {
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
              message: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });

    it("title is too long", async () => {
      req.body.title = invalidActivityInputs.TITLE_TOO_LONG;

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
              message: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
            },
          ],
        })
      ).toBeTrue();
    });
  });
});
