import { validateSync } from "class-validator";
import { Event } from "entities/Event";
import { validCommonInputs, validEventInputs } from "spec/testInputs";

fdescribe("Event entity validation tests", () => {
  let mockEvent: Partial<Event>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      // Mocks
      mockEvent = new Event();
      mockEvent.id = validCommonInputs.id;
      mockEvent.name = validEventInputs.name;
      mockEvent.summary = validEventInputs.summary;
      mockEvent.startingDate = validEventInputs.startingDate;
      mockEvent.endingDate = validEventInputs.endingDate;
      mockEvent.status = validEventInputs.status;
      mockEvent.createdAt = validCommonInputs.createdAt;
      mockEvent.updatedAt = validCommonInputs.updatedAt;
      mockEvent.employers = validEventInputs.employers;
      mockEvent.staffMembers = validEventInputs.staffMembers;
      mockEvent.activities = validEventInputs.activities;
      mockEvent.clients = validEventInputs.clients;
    });

    it("event has valid inputs", () => {
      const errors = validateSync(mockEvent);
      console.log(errors);

      expect(errors.length).toEqual(0);
      expect({ ...mockEvent }).toEqual({
        id: validCommonInputs.id,
        ...validEventInputs,
        createdAt: validCommonInputs.createdAt,
        updatedAt: validCommonInputs.updatedAt,
      });
    });
  });
});
