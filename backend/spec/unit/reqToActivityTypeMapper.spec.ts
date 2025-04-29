import { ActivityType } from "enums/ActivityType";
import { Request } from "express";
import { reqToActivityType } from "mappers/activityMapper";
import { invalidCommonInputs } from "spec/testInputs";

describe(`${reqToActivityType.name}`, () => {
  let req: Partial<Request>;

  beforeEach(() => {
    // HTTP request
    req = {
      method: "GET",
      body: JSON.parse(
        JSON.stringify({
          activityType: ActivityType.Workshop.toString(),
        })
      ),
    };
  });

  describe("Positive scenario", () => {
    it("request has valid activityType", () => {
      const activityType = reqToActivityType(req as Request);

      expect(activityType).toBeInstanceOf(String);
      expect(activityType).toEqual(ActivityType.Workshop.toString());
    });
  });

  describe("Negative scenarios", () => {
    invalidCommonInputs.REQUIRED_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, inputRequiredCase]) => {
        it("activityType" + testName, () => {
          req.body.activityType = inputRequiredCase;

          try {
            reqToActivityType(req as Request);
          } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
          }
        });
      }
    );

    invalidCommonInputs.INVALID_INPUT_CASES_FOR_STRINGS.forEach(
      ([testName, invalidInput]) => {
        it("activityType" + testName, () => {
          req.body.activityType = invalidInput;

          try {
            reqToActivityType(req as Request);
          } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
          }
        });
      }
    );
  });
});
