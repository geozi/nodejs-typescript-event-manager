import { callActivityUpdate } from "controllers/activityController";
import { AppDataSource } from "db/dataSource";
import { Activity } from "entities/primary/Activity";
import { Request, Response } from "express";
import { activityResponseMessages } from "messages/response/activityResponseMessages";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import {
  invalidActivityInputs,
  validActivityInputs,
  validCommonInputs,
} from "spec/testInputs";
import { TypeORMError, UpdateResult } from "typeorm";

describe("Activity update integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let setHeaderStub: SinonStub;
  let updateFuncStub: SinonStub;
  let findOneByStub: SinonStub;
  let mockUpdateResult: UpdateResult;
  let mockUpdatedActivity: Activity;
  let mockId: number;
  const activityRepository = AppDataSource.getRepository(Activity);

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Reset stubs and spies
      sinon.restore();

      // Stubs and spies
      updateFuncStub = sinon.stub(activityRepository, "update");
      findOneByStub = sinon.stub(activityRepository, "findOneBy");
      res = {
        setHeader: sinon.stub().callsFake(() => res) as unknown as SinonStub,
        status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
        json: sinon.spy(),
      };

      // Mocks
      mockId = validCommonInputs.id;
      mockUpdateResult = new UpdateResult();
      mockUpdateResult.affected = 1;
      mockUpdatedActivity = new Activity();
      mockUpdatedActivity.id = validCommonInputs.id;

      // HTTP request
      req = {
        method: "PUT",
        body: JSON.parse(
          JSON.stringify({
            id: mockId,
          })
        ),
      };
    });

    it(`response code ${httpCodes.OK}`, async () => {
      updateFuncStub.resolves(mockUpdateResult);
      findOneByStub.resolves(mockUpdatedActivity);

      await callActivityUpdate(req as Request, res as Response);

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;
      setHeaderStub = res.setHeader as SinonStub;

      expect(
        setHeaderStub.calledWith("x-api-version", apiVersionNumbers.VERSION_1_0)
      ).toBeTrue();
      expect(statusStub.calledWith(httpCodes.OK)).toBeTrue();
      expect(jsonSpy.calledWith({ data: mockUpdatedActivity })).toBeTrue();
    });
  });

  describe("Negative scenarios", () => {
    describe(`response code ${httpCodes.INTERNAL_SERVER_ERROR}`, () => {
      beforeEach(() => {
        // Reset stubs and spies
        sinon.restore();

        // Stubs and spies
        updateFuncStub = sinon.stub(activityRepository, "update");
        findOneByStub = sinon.stub(activityRepository, "findOneBy");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

        // Mocks
        mockId = validCommonInputs.id;
        mockUpdateResult = new UpdateResult();
        mockUpdateResult.affected = 1;

        // HTTP request
        req = {
          method: "PUT",
          body: JSON.parse(
            JSON.stringify({
              id: mockId,
            })
          ),
        };
      });

      it("Promise (update) rejects -> TypeORMError", async () => {
        updateFuncStub.rejects(new TypeORMError());

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });

      it("Promise (update) rejects -> ServerError", async () => {
        updateFuncStub.rejects({});

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: commonResponseMessages.INTERNAL_SERVER_ERROR_MESSAGE,
          })
        ).toBeTrue();
      });

      it("Promise (findOneBy) rejects -> TypeORMError", async () => {
        updateFuncStub.resolves(mockUpdateResult);
        findOneByStub.rejects(new TypeORMError());

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });

      it("Promise (findOneBy) rejects -> ServerError", async () => {
        updateFuncStub.resolves(mockUpdateResult);
        findOneByStub.rejects({});

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: commonResponseMessages.INTERNAL_SERVER_ERROR_MESSAGE,
          })
        ).toBeTrue();
      });
    });

    describe(`response code ${httpCodes.NOT_FOUND}`, () => {
      beforeEach(() => {
        // Reset stubs and spies
        sinon.restore();

        // Stubs and spies
        updateFuncStub = sinon.stub(activityRepository, "update");
        findOneByStub = sinon.stub(activityRepository, "findOneBy");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

        // Mocks
        mockId = validCommonInputs.id;
        mockUpdateResult = new UpdateResult();

        // HTTP request
        req = {
          method: "PUT",
          body: JSON.parse(
            JSON.stringify({
              id: mockId,
            })
          ),
        };
      });

      it("Promise (update) resolves to null -> NotFoundError", async () => {
        mockUpdateResult.affected = 0;
        updateFuncStub.resolves(mockUpdateResult);

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.NOT_FOUND)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE,
          })
        ).toBeTrue();
      });

      it("Promise (findOneBy) resolves to null -> NotFoundError", async () => {
        mockUpdateResult.affected = 1;
        updateFuncStub.resolves(mockUpdateResult);
        findOneByStub.resolves(null);

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.NOT_FOUND)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: activityResponseMessages.ACTIVITY_NOT_FOUND_MESSAGE,
          })
        ).toBeTrue();
      });
    });

    describe(`response code ${httpCodes.BAD_REQUEST}`, () => {
      beforeEach(() => {
        // Reset stubs and spies
        sinon.restore();

        // Stubs and spies
        updateFuncStub = sinon.stub(activityRepository, "update");
        findOneByStub = sinon.stub(activityRepository, "findOneBy");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

        // Mocks
        mockId = validCommonInputs.id;
        mockUpdateResult = new UpdateResult();

        // HTTP request
        req = {
          method: "PUT",
          body: JSON.parse(
            JSON.stringify({
              id: mockId,
              title: validActivityInputs.title,
              description: validActivityInputs.description,
            })
          ),
        };
      });

      it("Promise (title) rejects -> CustomValidationError", async () => {
        req.body.title = invalidActivityInputs.TITLE_TOO_SHORT;

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });

      it("Promise (description) rejects -> CustomValidationError", async () => {
        req.body.description = invalidActivityInputs.DESCRIPTION_TOO_SHORT;

        await callActivityUpdate(req as Request, res as Response);

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

      it("Promise (activityType) rejects -> CustomValidationError", async () => {
        req.body.activityType = invalidActivityInputs.ACTIVITY_TYPE_INVALID;

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            isEnum: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
          })
        ).toBeTrue();
      });

      it("Promise (title and description) rejects -> CustomValidationError", async () => {
        req.body.title = invalidActivityInputs.TITLE_TOO_SHORT;
        req.body.description = invalidActivityInputs.DESCRIPTION_TOO_LONG;

        await callActivityUpdate(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            maxLength:
              activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
            minLength: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
          })
        ).toBeTrue();
      });
    });
  });
});
