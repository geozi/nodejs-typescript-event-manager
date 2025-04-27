export class NotFoundError extends Error {
  constructor(message: string) {
    super();
    this.name = "CustomNotFoundError";
    this.message = message;
  }
}
