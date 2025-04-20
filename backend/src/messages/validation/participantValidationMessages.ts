import { employmentStatusAsObj } from "enums/EmploymentStatus";

export const participantFailedValidation = {
  EMPLOYMENT_STATUS_REQUIRED_MESSAGE: "Employment status is a required field",
  EMPLOYMENT_STATUS_INVALID_MESSAGE: `Employment status must be one of the following: ${Object.values(
    employmentStatusAsObj
  )}`,
  TICKET_ID_REQUIRED_MESSAGE: "Ticket ID is a required field",
  TICKET_ID_INVALID_TYPE_MESSAGE: "Ticket ID must be a string",
  TICKET_ID_INVALID_FORMAT_MESSAGE: `Ticket ID must be according to the format: EMP - DATE(YYY/MM/DD) - RN - 6 DIGITS`,
};
