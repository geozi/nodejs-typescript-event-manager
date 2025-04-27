import { callActivityCreation } from "controllers/activityController";
import { AppDataSource } from "db/dataSource";
import { Activity } from "entities/primary/Activity";
import { Request, Response } from "express";
import { apiVersionNumbers } from "resources/codes/apiVersionNumbers";
import { httpCodes } from "resources/codes/httpStatusCodes";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { validActivityInputs } from "spec/testInputs";

fdescribe("Activity addition integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub;
  let jsonSpy: SinonSpy;
  let setHeaderStub: SinonStub;
  let saveStub: SinonStub;
  let mockActivity: Activity;
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
            activityType: validActivityInputs.activityType,
          })
        ),
      };
    });

    it("response code 201", async () => {
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
});
