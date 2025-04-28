import { callActivityRetrievalById } from "controllers/activityController";
import { AppDataSource } from "db/dataSource";
import { Activity } from "entities/primary/Activity";
import { Request, Response } from "express";
import { activityResponseMessages } from "messages/response/activityResponseMessages";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { TypeORMError } from "typeorm";

describe("Activity retrieval by ID integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let setHeaderStub: SinonStub;
  let findOneByStub: SinonStub;
  let mockActivity: Activity;
  let mockId: number | string | object | boolean;
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
      mockId = 1;
      mockActivity = new Activity();
      mockActivity.id = mockId;

      // HTTP request
      req = {
        method: "GET",
        body: JSON.parse(
          JSON.stringify({
            id: mockId,
          })
        ),
      };
    });

    it(`response code ${httpCodes.OK}`, async () => {
      findOneByStub.resolves(mockActivity);

      await callActivityRetrievalById(req as Request, res as Response);

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
      });

      it("id is a string representation of a number", async () => {
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              id: "1",
            })
          ),
        };

        await callActivityRetrievalById(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: commonResponseMessages.INVALID_ID_TYPE_MESSAGE,
          })
        ).toBeTrue();
      });

      it("id is a hex string", async () => {
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              id: "680f43bdf2929acc6220668e",
            })
          ),
        };

        await callActivityRetrievalById(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: commonResponseMessages.INVALID_ID_TYPE_MESSAGE,
          })
        ).toBeTrue();
      });

      it("id is an object", async () => {
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              id: {},
            })
          ),
        };

        await callActivityRetrievalById(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: commonResponseMessages.INVALID_ID_TYPE_MESSAGE,
          })
        ).toBeTrue();
      });

      it("id is a boolean", async () => {
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              id: false,
            })
          ),
        };

        await callActivityRetrievalById(req as Request, res as Response);

        statusStub = res.status as SinonStub;
        jsonSpy = res.json as SinonSpy;

        expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
        expect(
          jsonSpy.calledWith({
            message: commonResponseMessages.INVALID_ID_TYPE_MESSAGE,
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
        mockId = 1;

        // HTTP request
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              id: mockId,
            })
          ),
        };
      });

      it("Promise resolves to null -> NotFoundError", async () => {
        findOneByStub.resolves(null);

        await callActivityRetrievalById(req as Request, res as Response);

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
        mockId = 1;

        // HTTP request
        req = {
          method: "GET",
          body: JSON.parse(
            JSON.stringify({
              id: mockId,
            })
          ),
        };
      });

      it("Promise rejects -> TypeORMError", async () => {
        findOneByStub.rejects(new TypeORMError());

        await callActivityRetrievalById(req as Request, res as Response);

        statusStub = res.status as SinonStub;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });

      it("Promise rejects -> ServerError", async () => {
        findOneByStub.rejects({});

        await callActivityRetrievalById(req as Request, res as Response);

        statusStub = res.status as SinonStub;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });
    });
  });
});
