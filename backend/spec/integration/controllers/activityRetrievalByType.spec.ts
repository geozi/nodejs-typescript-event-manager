import { callActivityRetrievalByType } from "controllers/activityController";
import { AppDataSource } from "db/dataSource";
import { Activity } from "entities/primary/Activity";
import { ActivityType } from "enums/ActivityType";
import { Request, Response } from "express";
import { activityResponseMessages } from "messages/response/activityResponseMessages";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { invalidCommonInputs, validActivityInputs } from "spec/testInputs";
import { TypeORMError } from "typeorm";

describe("Activity retrieval by type integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let setHeaderStub: SinonStub;
  let findByStub: SinonStub;
  let mockActivity1: Activity;
  let mockActivity2: Activity;
  let mockActivities: Activity[];
  let mockType: ActivityType;
  const activityRepository = AppDataSource.getRepository(Activity);

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Reset stubs and spies
      sinon.restore();

      // Stubs and spies
      findByStub = sinon.stub(activityRepository, "findBy");
      res = {
        setHeader: sinon.stub().callsFake(() => res) as unknown as SinonStub,
        status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
        json: sinon.spy(),
      };

      // Mocks
      mockType = validActivityInputs.activityType;
      mockActivity1 = new Activity();
      mockActivity1.activityType = mockType;
      mockActivity2 = new Activity();
      mockActivity2.activityType = mockType;
      mockActivities = [mockActivity1, mockActivity2];

      // HTTP request
      req = {
        method: "GET",
        body: JSON.parse(
          JSON.stringify({
            activityType: mockType,
          })
        ),
      };
    });

    it(`response code ${httpCodes.OK}`, async () => {
      findByStub.resolves(mockActivities);

      await callActivityRetrievalByType(req as Request, res as Response);

      setHeaderStub = res.setHeader as SinonStub;
      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;

      expect(
        setHeaderStub.calledWith("x-api-version", apiVersionNumbers.VERSION_1_0)
      ).toBeTrue();
      expect(statusStub.calledWith(httpCodes.OK)).toBeTrue();
      expect(jsonSpy.calledWith({ data: mockActivities })).toBeTrue();
    });
  });

  describe("Negative scenarios", () => {
    describe(`response code ${httpCodes.BAD_REQUEST}`, () => {
      beforeEach(() => {
        // Reset stubs and spies
        sinon.restore();

        // Stubs and spies
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

        // Mocks
        mockType = validActivityInputs.activityType;

        // HTTP request
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              activityType: mockType,
            })
          ),
        };
      });

      invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
        ([testName, inputRequiredCase]) => {
          it("activityType" + testName, async () => {
            req.body.activityType = inputRequiredCase;

            await callActivityRetrievalByType(req as Request, res as Response);

            statusStub = res.status as SinonStub;
            jsonSpy = res.json as SinonSpy;

            expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
            expect(
              jsonSpy.calledWith({
                message: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
              })
            ).toBeTrue();
          });
        }
      );

      invalidCommonInputs.INVALID_INPUT_CASES_FOR_STRINGS.forEach(
        ([testName, invalidInput]) => {
          it("activityType" + testName, async () => {
            req.body.activityType = invalidInput;
            await callActivityRetrievalByType(req as Request, res as Response);

            statusStub = res.status as SinonStub;
            jsonSpy = res.json as SinonSpy;

            expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
            expect(
              jsonSpy.calledWith({
                message: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
              })
            ).toBeTrue();
          });
        }
      );
    });

    describe(`response code ${httpCodes.INTERNAL_SERVER_ERROR}`, () => {
      beforeEach(() => {
        // Reset stubs and spies
        sinon.restore();

        // Stubs and spies
        findByStub = sinon.stub(activityRepository, "findBy");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

        // Mocks
        mockType = validActivityInputs.activityType;

        // HTTP request
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              activityType: mockType,
            })
          ),
        };
      });

      it("Promise rejects -> TypeORMError", async () => {
        findByStub.rejects(new TypeORMError());

        await callActivityRetrievalByType(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });

      it("Promise rejects -> ServerError", async () => {
        findByStub.rejects({});

        await callActivityRetrievalByType(req as Request, res as Response);

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
        findByStub = sinon.stub(activityRepository, "findBy");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

        // Mocks
        mockType = validActivityInputs.activityType;
        mockActivities = [];

        // HTTP request
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              activityType: mockType,
            })
          ),
        };
      });

      it("Promise resolves to null -> NotFoundError", async () => {
        findByStub.resolves(mockActivities);

        await callActivityRetrievalByType(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.NOT_FOUND)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: activityResponseMessages.ACTIVITY_S_NOT_FOUND_MESSAGE,
          })
        ).toBeTrue();
      });
    });
  });
});
