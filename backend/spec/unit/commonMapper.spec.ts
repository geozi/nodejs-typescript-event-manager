import { Request } from "express";
import { reqToId } from "mappers/commonMapper";

describe("Common mapper unit tests", () => {
  let req: Partial<Request>;
  let mockInput: number | string;

  describe(`${reqToId.name}`, () => {
    it("request has valid id", () => {
      mockInput = 1;

      req = {
        body: JSON.parse(
          JSON.stringify({
            id: mockInput,
          })
        ),
      };

      const id = reqToId(req as Request);

      expect(id).toBeInstanceOf(Number);
      expect(id).toEqual(1);
    });

    it("id is a string representation of integer", () => {
      mockInput = "1";

      req = {
        body: JSON.parse(
          JSON.stringify({
            id: mockInput,
          })
        ),
      };

      try {
        reqToId(req as Request);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    it("id is a hex string", () => {
      mockInput = "680f398b117c19aabf04217d";

      req = {
        body: JSON.parse(
          JSON.stringify({
            id: mockInput,
          })
        ),
      };

      try {
        reqToId(req as Request);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
