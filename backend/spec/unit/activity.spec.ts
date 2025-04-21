import { validateSync } from "class-validator";
import { Activity } from "entities/Activity";
import { validActivityInputs, validCommonInputs } from "spec/testInputs";

describe("Activity entity validation tests", () => {
  let mockActivity: Partial<Activity>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockActivity = new Activity();
      mockActivity.id = validCommonInputs.id;
      mockActivity.title = validActivityInputs.title;
      mockActivity.description = validActivityInputs.description;
      mockActivity.activityType = validActivityInputs.activityType;
    });

    it("activity has valid inputs", () => {
      const errors = validateSync(mockActivity);

      console.log(Object.toString());
      console.log(validActivityInputs.toString());

      expect(errors.length).toEqual(0);
      expect({ ...mockActivity }).toEqual({
        id: validCommonInputs.id,
        ...validActivityInputs,
      });
    });
  });
});
