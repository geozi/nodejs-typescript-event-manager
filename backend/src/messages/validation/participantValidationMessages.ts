import { employmentStatusAsObj } from "enums/EmploymentStatus";

export const participantFailedValidation = {
  FIRST_NAME_REQUIRED_MESSAGE: "First name is a required field",
  FIRST_NAME_INVALID_TYPE_MESSAGE: "First name must be a string",
  FIRST_NAME_INVALID_FORMAT_MESSAGE: "First name must only contain letters",
  LAST_NAME_REQUIRED_MESSAGE: "Last name is a required field",
  LAST_NAME_INVALID_TYPE_MESSAGE: "Last name must be a string",
  LAST_NAME_INVALID_FORMAT_MESSAGE: "Last name must only contain letters",
  EMPLOYMENT_STATUS_REQUIRED_MESSAGE: "Employment status is a required field",
  EMPLOYMENT_STATUS_INVALID_MESSAGE: `Employment status must be one of the following: ${Object.values(
    employmentStatusAsObj
  )}`,
  TICKET_ID_REQUIRED_MESSAGE: "Ticket ID is a required field",
  TICKET_ID_INVALID_TYPE_MESSAGE: "Ticket ID must be a string",
  TICKET_ID_INVALID_FORMAT_MESSAGE: `Ticket ID must be according to the format: EMP - DATE(YYY/MM/DD) - RN - 6 DIGITS`,
};
