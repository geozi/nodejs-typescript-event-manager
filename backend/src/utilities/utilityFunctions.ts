import { ValidationError } from "class-validator";
import { CustomValidationError } from "errors/CustomValidationError";
import { ServerError } from "errors/ServerError";
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
): TypeORMError | CustomValidationError {
  if (value instanceof TypeORMError || value instanceof CustomValidationError) {
    return value;
  } else {
    return new ServerError();
  }
}
