import { ValidationError } from "class-validator";

export class CustomValidationError extends ValidationError {
  name: string;

  constructor() {
    super();
    this.name = "ValidationError";
  }
}
