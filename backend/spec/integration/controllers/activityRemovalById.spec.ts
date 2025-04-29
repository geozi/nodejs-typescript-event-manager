import { callActivityRemovalById } from "controllers/activityController";
import { AppDataSource } from "db/dataSource";
import { Activity } from "entities/primary/Activity";
import { Request, Response } from "express";
import { activityResponseMessages } from "messages/response/activityResponseMessages";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { invalidCommonInputs, validCommonInputs } from "spec/testInputs";
import { TypeORMError } from "typeorm";

describe("Activity removal by id integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let setHeaderStub: SinonStub;
  let findOneByStub: SinonStub;
  let removeStub: SinonStub;
  let mockActivity: Activity;
  let mockId: number;
  const activityRepository = AppDataSource.getRepository(Activity);

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Reset stubs and spies
      sinon.restore();

      // Stubs and spies
      findOneByStub = sinon.stub(activityRepository, "findOneBy");
      removeStub = sinon.stub(activityRepository, "remove");
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
        method: "DELETE",
        body: JSON.parse(
          JSON.stringify({
            id: mockId,
          })
        ),
      };
    });

    it(`response code ${httpCodes.NO_CONTENT}`, async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.resolves(mockActivity);

      await callActivityRemovalById(req as Request, res as Response);

      setHeaderStub = res.setHeader as SinonStub;
      statusStub = res.status as SinonStub;

      expect(
        setHeaderStub.calledWith("x-api-version", apiVersionNumbers.VERSION_1_0)
      ).toBeTrue();
      expect(statusStub.calledWith(httpCodes.NO_CONTENT)).toBeTrue();
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

        // HTTP request
        req = {
          method: "DELETE",
          body: JSON.parse(
            JSON.stringify({
              id: validCommonInputs.id,
            })
          ),
        };
      });

      invalidCommonInputs.ID_REQUIRED_CASES.forEach(
        ([testName, idRequiredCase]) => {
          it(testName, async () => {
            req.body.id = idRequiredCase;

            await callActivityRemovalById(req as Request, res as Response);

            statusStub = res.status as SinonStub;
            jsonSpy = res.json as SinonSpy;

            expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
            expect(
              jsonSpy.calledWith({
                message: commonResponseMessages.INVALID_ID_TYPE_MESSAGE,
              })
            ).toBeTrue();
          });
        }
      );

      invalidCommonInputs.ID_INVALID_TYPE_CASES.forEach(
        ([testName, invalidId]) => {
          it(testName, async () => {
            req.body.id = invalidId;

            await callActivityRemovalById(req as Request, res as Response);

            statusStub = res.status as SinonStub;
            jsonSpy = res.json as SinonSpy;

            expect(statusStub.calledWith(httpCodes.BAD_REQUEST)).toBeTrue();
            expect(
              jsonSpy.calledWith({
                message: commonResponseMessages.INVALID_ID_TYPE_MESSAGE,
              })
            ).toBeTrue();
          });
        }
      );
    });

    describe(`response code ${httpCodes.NOT_FOUND}`, () => {
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
          method: "DELETE",
          body: JSON.parse(
            JSON.stringify({
              id: mockId,
            })
          ),
        };
      });

      it("Promise resolves to null -> NotFoundError", async () => {
        findOneByStub.resolves(null);

        await callActivityRemovalById(req as Request, res as Response);

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
        removeStub = sinon.stub(activityRepository, "remove");

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
          method: "DELETE",
          body: JSON.parse(
            JSON.stringify({
              id: mockId,
            })
          ),
        };
      });

      it("Promise (findOneBy) rejects -> TypeORMError", async () => {
        findOneByStub.rejects(new TypeORMError());

        await callActivityRemovalById(req as Request, res as Response);

        statusStub = res.status as SinonStub;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });

      it("Promise (findOneBy) rejects -> ServerError", async () => {
        findOneByStub.rejects({});

        await callActivityRemovalById(req as Request, res as Response);

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

      it("Promise (remove) rejects -> TypeORMError", async () => {
        findOneByStub.resolves(mockActivity);
        removeStub.rejects(new TypeORMError());

        await callActivityRemovalById(req as Request, res as Response);

        statusStub = res.status as SinonStub;

        expect(
          statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR)
        ).toBeTrue();
      });

      it("Promise (remove) rejects -> ServerError", async () => {
        findOneByStub.resolves(mockActivity);
        removeStub.rejects({});

        await callActivityRemovalById(req as Request, res as Response);

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
  });
});
