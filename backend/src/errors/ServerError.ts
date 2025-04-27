import { commonResponseMessages } from "messages/response/commonResponseMessages";

export class ServerError extends Error {
  constructor() {
    super();
    this.name = "ServerError";
    this.message = commonResponseMessages.INTERNAL_SERVER_ERROR_MESSAGE;
  }
}
