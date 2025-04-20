import { validateSync } from "class-validator";
import { Staff } from "entities/Staff";
import { validCommonInputs, validStaffInputs } from "spec/testInputs";

describe("Staff entity validation tests", () => {
  let mockStaff: Partial<Staff>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockStaff = new Staff();
      mockStaff.id = validCommonInputs.id;
      mockStaff.firstName = validCommonInputs.firstName;
      mockStaff.lastName = validCommonInputs.lastName;
      mockStaff.jobTitle = validStaffInputs.jobTitle;
      mockStaff.department = validStaffInputs.department;
    });

    it("staff has valid inputs", () => {
      const errors = validateSync(mockStaff);

      expect(errors.length).toEqual(0);
      expect(mockStaff.toString()).toEqual(validStaffInputs.toString());
    });
  });
});
