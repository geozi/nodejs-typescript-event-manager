import { callActivityRetrievalByTitle } from "controllers/activityController";
import { AppDataSource } from "db/dataSource";
import { Activity } from "entities/primary/Activity";
import { Request, Response } from "express";
import { activityResponseMessages } from "messages/response/activityResponseMessages";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { validActivityInputs } from "spec/testInputs";
import { TypeORMError } from "typeorm";

describe("Activity retrieval by title integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let setHeaderStub: SinonStub;
  let findOneByStub: SinonStub;
  let mockActivity: Activity;
  let mockTitle: number | string;
  const activityRepository = AppDataSource.getRepository(Activity);

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Reset stubs and spies
      sinon.restore();

      // Stubs and spies
      findOneByStub = sinon.stub(activityRepository, "findOneBy");
      res = {
        setHeader: sinon.stub().callsFake(() => res) as unknown as SinonStub,
        status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
        json: sinon.spy(),
      };

      // Mocks
      mockTitle = validActivityInputs.title;
      mockActivity = new Activity();
      mockActivity.title = mockTitle;

      // HTTP request
      req = {
        body: JSON.parse(
          JSON.stringify({
            title: mockTitle,
          })
        ),
      };
    });

    it(`response code ${httpCodes.OK}`, async () => {
      findOneByStub.resolves(mockActivity);

      await callActivityRetrievalByTitle(req as Request, res as Response);

      statusStub = res.status as SinonStub;
      jsonSpy = res.json as SinonSpy;
      setHeaderStub = res.setHeader as SinonStub;

      expect(
        setHeaderStub.calledWith("x-api-version", apiVersionNumbers.VERSION_1_0)
      ).toBeTrue();
      expect(statusStub.calledWith(httpCodes.OK)).toBeTrue();
      expect(jsonSpy.calledWith({ data: mockActivity })).toBeTrue();
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
        mockTitle = 1;

        // HTTP request
        req = {
          body: JSON.parse(
            JSON.stringify({
              title: mockTitle,
            })
          ),
        };
      });

      it("title is a numeric value", async () => {
        await callActivityRetrievalByTitle(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE,
          })
        ).toBeTrue();
      });
    });

    describe(`response code ${httpCodes.INTERNAL_SERVER_ERROR}`, () => {
      beforeEach(() => {
        // Reset stubs and spies
        sinon.restore();

        // Stubs and spies
        findOneByStub = sinon.stub(activityRepository, "findOneBy");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

        // Mocks
        mockTitle = validActivityInputs.title;

        // HTTP request
        req = {
          body: JSON.parse(
            JSON.stringify({
              title: mockTitle,
            })
          ),
        };
      });

      it("Promise rejects -> TypeORMError", async () => {
        findOneByStub.rejects(new TypeORMError());

        await callActivityRetrievalByTitle(req as Request, res as Response);

        statusStub = res.status as SinonStub;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });

      it("Promise rejects -> ServerError", async () => {
        findOneByStub.rejects({});

        await callActivityRetrievalByTitle(req as Request, res as Response);

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
        findOneByStub = sinon.stub(activityRepository, "findOneBy");
        res = {
          status: sinon.stub().callsFake(() => res) as unknown as SinonStub,
          json: sinon.spy(),
        };

        // Mocks
        mockTitle = validActivityInputs.title;

        // HTTP request
        req = {
          body: JSON.parse(
            JSON.stringify({
              title: mockTitle,
            })
          ),
        };
      });

      it("Promise resolves to null -> NotFoundError", async () => {
        findOneByStub.resolves(null);

        await callActivityRetrievalByTitle(req as Request, res as Response);

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
  });
});
