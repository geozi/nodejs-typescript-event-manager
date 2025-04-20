import { validateSync } from "class-validator";
import { Participant } from "entities/Participant";
import { validParticipantInputs } from "spec/testInputs";

describe("Participant entity unit tests", () => {
  let mockParticipant: Partial<Participant>;

  describe("Positive scenario", () => {
    beforeEach(() => {
      mockParticipant = new Participant();
      mockParticipant.id = validParticipantInputs.id;
      mockParticipant.firstName = validParticipantInputs.firstName;
      mockParticipant.lastName = validParticipantInputs.lastName;
      mockParticipant.email = validParticipantInputs.email;
      mockParticipant.phoneNumber = validParticipantInputs.phoneNumber;
      mockParticipant.employmentStatus =
        validParticipantInputs.employmentStatus;
      mockParticipant.ticketID = validParticipantInputs.ticketId;
    });

    it("participant has valid inputs", () => {
      const errors = validateSync(mockParticipant);

      expect(errors.length).toEqual(0);
      expect(mockParticipant.toString()).toEqual(
        validParticipantInputs.toString()
      );
    });
  });
});
