import { AppDataSource } from "db/dataSource";
import { ActivityUpdateDTO } from "dto/ActivityUpdateDTO";
import { Activity } from "entities/primary/Activity";
import { getActivityById } from "repositories/activityRepository";
import sinon, { SinonStub } from "sinon";
import { TypeORMError, UpdateResult } from "typeorm";
fdescribe("Activity repository unit tests", () => {
  let findOneByStub: SinonStub;
  let findByStub: SinonStub;
  let updateStub: SinonStub;
  let removeStub: SinonStub;
  let saveStub: SinonStub;
  let mockUpdateResult: UpdateResult;
  let mockActivity: Activity;
  let mockDataObject: ActivityUpdateDTO;
  let mockTitle: string;
  let mockId: number;

  const activityRepository = AppDataSource.getRepository(Activity);

  describe(`${getActivityById.name}`, () => {
    beforeEach(() => {
      // Reset stubs
      sinon.restore();

      // Stubs
      findOneByStub = sinon.stub(activityRepository, "findOneBy");

      // Mocks
      mockId = 1;
      mockActivity = new Activity();
      mockActivity.id = mockId;
    });

    it("Promise resolves to Activity object", async () => {
      findOneByStub.resolves(mockActivity);

      const retrievedActivity = await getActivityById(mockId);

      expect(retrievedActivity).not.toBeNull();
      expect(retrievedActivity).toBeInstanceOf(Activity);
    });

    it("Promise rejects -> TypeORMError", async () => {
      findOneByStub.rejects(new TypeORMError());

      try {
        await getActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise rejects -> Error", async () => {
      findOneByStub.rejects();

      try {
        await getActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
