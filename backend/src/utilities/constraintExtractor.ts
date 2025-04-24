import { ValidationError } from "class-validator";

export function extractValidationErrorConstraints(errors: ValidationError[]) {
  const constraintArray: (Record<string, string> | undefined)[] = [];
  errors.forEach((err) => constraintArray.push(err.constraints));
  return Object.assign({}, ...constraintArray);
}
