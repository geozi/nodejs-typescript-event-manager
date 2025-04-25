import { validate } from "class-validator";
import { Activity } from "entities/primary/Activity";
import { ActivityType } from "enums/ActivityType";
import { Request } from "express";
import { reqToActivity } from "mappers/activityMapper";
import sinon, { SinonSpy } from "sinon";
import { validActivityInputs } from "spec/testInputs";

fdescribe("Activity mapper unit tests", () => {
  let req: Partial<Request>;
  let validateSpy: SinonSpy;

  describe(`${reqToActivity.name}`, () => {
    beforeEach(() => {
      // Reset spies
      sinon.restore();

      // Spies
      validateSpy = sinon.spy(validate);

      // HTTP request
      req = {
        body: JSON.parse(
          JSON.stringify({
            title: validActivityInputs.title,
            description: validActivityInputs.description,
            activityType: ActivityType.Workshop.toString(),
          })
        ),
      };
    });

    it("request has valid inputs", async () => {
      const newActivity = reqToActivity(req as Request);
      const errors = await validateSpy(newActivity);

      expect(newActivity).toBeInstanceOf(Activity);
      expect(validateSpy.called).toBeTrue();
      expect(validateSpy.callCount).toEqual(1);
      expect(errors.length).toEqual(0);
    });
  });
});
