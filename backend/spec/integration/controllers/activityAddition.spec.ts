import { callActivityCreation } from "controllers/activityController";
import { AppDataSource } from "db/dataSource";
import { Activity } from "entities/primary/Activity";
import { Request, Response } from "express";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { invalidActivityInputs, validActivityInputs } from "spec/testInputs";
import { TypeORMError } from "typeorm";

describe("Activity addition integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let setHeaderStub: SinonStub;
  let saveStub: SinonStub;
  let mockActivity: Activity;
  let mockNumericValue: 1;
  const activityRepository = AppDataSource.getRepository(Activity);

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Reset stubs and spies
      sinon.restore();

      // Stubs and spies
      saveStub = sinon.stub(activityRepository, "save");
      res = {
        setHeader: sinon.stub().callsFake(() => res) as unknown as SinonStub,
        status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
        json: sinon.spy(),
      };

      // Mocks
      mockActivity = new Activity();
      mockActivity.title = validActivityInputs.title;
      mockActivity.description = validActivityInputs.description;
      mockActivity.activityType = validActivityInputs.activityType;

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

    it(`response code ${httpCodes.CREATED}`, async () => {
      saveStub.resolves(mockActivity);

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;
      setHeaderStub = res.setHeader as SinonStub;

      await callActivityCreation(req as Request, res as Response);

      expect(
        setHeaderStub.calledWith("x-api-version", apiVersionNumbers.VERSION_1_0)
      ).toBeTrue();
      expect(statusStub.calledWith(httpCodes.CREATED)).toBeTrue();
    });
  });

  describe("Negative scenarios", () => {
    describe(`response code ${httpCodes.BAD_REQUEST}`, () => {
      beforeEach(() => {
        // Reset stubs and spies
        sinon.restore();

        // Stubs and spies
        saveStub = sinon.stub(activityRepository, "save");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

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

      it(`title is undefined`, async () => {
        req.body.title = undefined;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            isNotEmpty: activityFailedValidation.TITLE_REQUIRED_MESSAGE,
            isString: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE,
            minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
            maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("title is not a string", async () => {
        req.body.title = mockNumericValue;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            isString: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE,
            minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
            maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("title is too short", async () => {
        req.body.title = invalidActivityInputs.TITLE_TOO_SHORT;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("title is too long", async () => {
        req.body.title = invalidActivityInputs.TITLE_TOO_LONG;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            maxLength: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("description is undefined", async () => {
        req.body.description = undefined;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            isNotEmpty: activityFailedValidation.DESCRIPTION_REQUIRED_MESSAGE,
            isString: activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
            minLength:
              activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
            maxLength:
              activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("description is not a string", async () => {
        req.body.description = mockNumericValue;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            isString: activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
            minLength:
              activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
            maxLength:
              activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("description is too short", async () => {
        req.body.description = invalidActivityInputs.DESCRIPTION_TOO_SHORT;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            minLength:
              activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("description is too long", async () => {
        req.body.description = invalidActivityInputs.DESCRIPTION_TOO_LONG;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            maxLength:
              activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("activityType is undefined", async () => {
        req.body.activityType = undefined;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            isNotEmpty: activityFailedValidation.ACTIVITY_TYPE_REQUIRED_MESSAGE,
            isEnum: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
          })
        ).toBeTrue();
      });

      it("activityType is invalid", async () => {
        req.body.activityType = invalidActivityInputs.ACTIVITY_TYPE_INVALID;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            isEnum: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
          })
        ).toBeTrue();
      });

      it("description is too short and activityType is invalid", async () => {
        req.body.description = invalidActivityInputs.DESCRIPTION_TOO_SHORT;
        req.body.activityType = invalidActivityInputs.ACTIVITY_TYPE_INVALID;

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            minLength:
              activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
            isEnum: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
          })
        ).toBeTrue();
      });
    });

    describe(`response code ${httpCodes.INTERNAL_SERVER_ERROR}`, () => {
      beforeEach(() => {
        // Reset stubs and spies
        sinon.restore();

        // Stubs and spies
        saveStub = sinon.stub(activityRepository, "save");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

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

      it("Promise rejects -> TypeORMError", async () => {
        saveStub.rejects(new TypeORMError());

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });

      it("Promise rejects -> ServerError", async () => {
        saveStub.rejects();

        await callActivityCreation(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
        expect(
          jsonSpy.calledWith(
            commonResponseMessages.INTERNAL_SERVER_ERROR_MESSAGE
          )
        ).toBeTrue();
      });
    });
  });
});
