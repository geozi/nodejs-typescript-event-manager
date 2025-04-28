import { Request } from "express";
import { appLogger } from "logs/loggerConfig";
import { commonResponseMessages } from "messages/response/commonResponseMessages";

export const reqToId = (req: Request): number => {
  const { id } = req.body;
  if (typeof id !== "number" || !Number.isInteger(id)) {
    appLogger.error(
      `Common mapper: ${reqToId.name} -> ${TypeError.name} thrown`
    );

    const typeError = new TypeError();
    typeError.message = commonResponseMessages.INVALID_ID_TYPE_MESSAGE;

    throw typeError;
  }

  return id;
};
