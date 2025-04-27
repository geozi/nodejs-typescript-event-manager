import { Request } from "express";

export const reqToId = (req: Request): number => {
  const { id } = req.body;
  if (typeof id !== "number" || !Number.isInteger(id)) {
    throw new TypeError();
  }

  return id;
};
