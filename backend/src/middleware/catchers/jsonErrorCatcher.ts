import { NextFunction, Request, Response } from "express";
import { appLogger } from "logs/loggerConfig";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { httpCodes } from "resources/codes/httpStatusCodes";

export const catchJSONerror = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof SyntaxError && "body" in err) {
    appLogger.error(
      `JSON Error catcher: ${catchJSONerror.name} -> ${err.name} detected and caught`
    );

    res.status(httpCodes.BAD_REQUEST).send({
      message: commonResponseMessages.INVALID_JSON_MESSAGE,
    });
    return;
  }
  next(err);
};
