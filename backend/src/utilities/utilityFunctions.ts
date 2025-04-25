import { ValidationError } from "class-validator";
import { CustomValidationError } from "errors/CustomValidationError";
import { commonResponseMessages } from "messages/response/commonResponseMessages";
import { TypeORMError } from "typeorm";

export function extractValidationErrorConstraints(
  errors: ValidationError[]
): Record<string, string> {
  const constraintArray: (Record<string, string> | undefined)[] = [];
  errors.forEach((err) => constraintArray.push(err.constraints));
  return Object.assign({}, ...constraintArray);
}

export function determineError(
  value: unknown
): TypeORMError | CustomValidationError | Error {
  if (
    value instanceof Error ||
    value instanceof TypeORMError ||
    value instanceof CustomValidationError
  ) {
    return value;
  } else {
    return new Error(commonResponseMessages.UNKNOWN_ERROR_TYPE);
  }
}
