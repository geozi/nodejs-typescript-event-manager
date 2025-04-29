import { Request, Response } from "express";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { catchExpressValidationErrors } from "middleware/catchers/expressErrorCatcher";
import { activityRemovalByTitleRules } from "middleware/rules/activityRules";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import {
  invalidActivityInputs,
  invalidCommonInputs,
  validActivityInputs,
} from "spec/testInputs";

describe("Activity removal by title rules: integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let mockTitle: string;
  const activityRemovalArray = [
    ...activityRemovalByTitleRules(),
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
      req = {
        method: "DELETE",
        body: JSON.parse(JSON.stringify({ title: mockTitle })),
      };
    });

    it("request has valid title", async () => {
      for (const middleware of activityRemovalArray) {
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

      // HTTP request
      req = {
        method: "DELETE",
        body: JSON.parse(JSON.stringify({ title: mockTitle })),
      };
    });

    invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, inputRequiredCase]) => {
        it("title" + testName, async () => {
          req.body.title = inputRequiredCase;

          for (const middleware of activityRemovalArray) {
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

          for (const middleware of activityRemovalArray) {
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

      for (const middleware of activityRemovalArray) {
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

      for (const middleware of activityRemovalArray) {
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
