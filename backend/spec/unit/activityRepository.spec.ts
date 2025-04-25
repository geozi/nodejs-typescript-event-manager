/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppDataSource } from "db/dataSource";
import { ActivityUpdateDTO } from "dto/ActivityUpdateDTO";
import { Activity } from "entities/primary/Activity";
import { ActivityType } from "enums/ActivityType";
import { CustomValidationError } from "errors/CustomValidationError";
import {
  createActivity,
  deleteActivityById,
  deleteActivityByTitle,
  getActivitiesByType,
  getActivityById,
  getActivityByTitle,
  updateActivity,
} from "repositories/activityRepository";
import sinon, { SinonStub } from "sinon";
import { validActivityInputs, validCommonInputs } from "spec/testInputs";
import { TypeORMError, UpdateResult } from "typeorm";

describe("Activity repository unit tests", () => {
  let findOneByStub: SinonStub;
  let findByStub: SinonStub;
  let updateStub: SinonStub;
  let removeStub: SinonStub;
  let saveStub: SinonStub;
  let mockUpdateResult: UpdateResult;
  let mockActivity: Activity;
  let mockActivities: Activity[];
  let mockDataObject: ActivityUpdateDTO;
  let mockTitle: string;
  let mockId: number;
  let mockActivityType: ActivityType;

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
      expect(retrievedActivity!.id).toEqual(mockId);
    });

    it("Promise resolves to null", async () => {
      findOneByStub.resolves(null);

      const retrievedActivity = await getActivityById(mockId);

      expect(retrievedActivity).toBeNull();
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

    it("Promise rejects -> Unknown type error", async () => {
      findOneByStub.rejects({});

      try {
        await getActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe(`${getActivityByTitle.name}`, () => {
    beforeEach(() => {
      // Reset stubs
      sinon.restore();

      // Stubs
      findOneByStub = sinon.stub(activityRepository, "findOneBy");

      // Mocks
      mockTitle = validActivityInputs.title;
      mockActivity = new Activity();
      mockActivity.title = mockTitle;
    });

    it("Promise resolves to Activity object", async () => {
      findOneByStub.resolves(mockActivity);

      const retrievedActivity = await getActivityByTitle(mockTitle);

      expect(retrievedActivity).not.toBeNull();
      expect(retrievedActivity).toBeInstanceOf(Activity);
      expect(retrievedActivity!.title).toEqual(mockTitle);
    });

    it("Promise resolves to null", async () => {
      findOneByStub.resolves(null);

      const retrievedActivity = await getActivityByTitle(mockTitle);

      expect(retrievedActivity).toBeNull();
    });

    it("Promise rejects -> TypeORMError", async () => {
      findOneByStub.rejects(new TypeORMError());

      try {
        await getActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise rejects -> Error", async () => {
      findOneByStub.rejects();

      try {
        await getActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise rejects -> Unknown type error", async () => {
      findOneByStub.rejects({});

      try {
        await getActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe(`${getActivitiesByType.name}`, () => {
    beforeEach(() => {
      // Reset stubs
      sinon.restore();

      // Stubs
      findByStub = sinon.stub(activityRepository, "findBy");

      // Mocks
      mockActivityType = ActivityType.Panel;
      mockActivity = new Activity();
      mockActivity.activityType = mockActivityType;
      mockActivities = [mockActivity];
    });

    it("Promise resolves to Activity[]", async () => {
      findByStub.resolves(mockActivities);

      const retrievedActivities = await getActivitiesByType(mockActivityType);

      expect(retrievedActivities.length).toEqual(1);
      expect(retrievedActivities[0].activityType).toEqual(mockActivityType);
    });

    it("Promise resolves to empty array", async () => {
      findByStub.resolves([]);

      const retrievedActivities = await getActivitiesByType(mockActivityType);

      expect(retrievedActivities.length).toEqual(0);
    });

    it("Promise rejects -> TypeORMError", async () => {
      findByStub.rejects(new TypeORMError());

      try {
        await getActivitiesByType(mockActivityType);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise rejects -> Error", async () => {
      findByStub.rejects();

      try {
        await getActivitiesByType(mockActivityType);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise rejects -> Unknown type error", async () => {
      findByStub.rejects({});

      try {
        await getActivitiesByType(mockActivityType);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe(`${createActivity.name}, `, () => {
    beforeEach(() => {
      // Reset stubs
      sinon.restore();

      // Stubs
      saveStub = sinon.stub(activityRepository, "save");

      // Mocks
      mockActivity = new Activity();
      mockActivity.id = validCommonInputs.id;
      mockActivity.title = validActivityInputs.title;
      mockActivity.description = validActivityInputs.description;
      mockActivity.activityType = validActivityInputs.activityType;
      mockActivity.createdAt = new Date();
      mockActivity.updatedAt = new Date();
      mockActivity.events = validActivityInputs.events;
    });

    it("Promise resolves to Activity object", async () => {
      saveStub.resolves(mockActivity);

      const savedActivity = await createActivity(mockActivity);

      expect(savedActivity).not.toBeNull();
      expect({ ...savedActivity }).toEqual({ ...mockActivity });
    });

    it("Promise rejects -> CustomValidationError", async () => {
      saveStub.rejects(new CustomValidationError());

      try {
        await createActivity(mockActivity);
      } catch (error) {
        expect(error).toBeInstanceOf(CustomValidationError);
      }
    });

    it("Promise rejects -> TypeORMError", async () => {
      saveStub.rejects(new TypeORMError());

      try {
        await createActivity(mockActivity);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise rejects -> Error", async () => {
      saveStub.rejects();

      try {
        await createActivity(mockActivity);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise rejects -> Unknown type error", async () => {
      saveStub.rejects({});

      try {
        await createActivity(mockActivity);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe(`${updateActivity.name}`, () => {
    beforeEach(() => {
      // Reset stubs
      sinon.restore();

      // Stubs
      updateStub = sinon.stub(activityRepository, "update");
      findOneByStub = sinon.stub(activityRepository, "findOneBy");

      // Mocks
      mockDataObject = new ActivityUpdateDTO();
      mockDataObject.id = validCommonInputs.id;
      mockDataObject.description = validActivityInputs.description;
      mockUpdateResult = new UpdateResult();
      mockActivity = new Activity();
      mockActivity.id = mockDataObject.id;
      mockActivity.description = mockDataObject.description;
    });

    it("Promise resolves to Activity object", async () => {
      mockUpdateResult.affected = 1;
      updateStub.resolves(mockUpdateResult);
      findOneByStub.resolves(mockActivity);

      const updatedActivity = await updateActivity(mockDataObject);

      expect(updatedActivity).not.toBeNull();
      expect(updatedActivity?.id).toEqual(mockDataObject.id);
      expect(updatedActivity?.description).toEqual(mockDataObject.description);
    });

    it("Promise (update) resolves to null", async () => {
      mockUpdateResult.affected = 0;
      updateStub.resolves(mockUpdateResult);

      const updatedActivity = await updateActivity(mockDataObject);

      expect(updatedActivity).toBeNull();
    });

    it("Promise (findOneBy) resolves to null", async () => {
      mockUpdateResult.affected = 1;
      updateStub.resolves(mockUpdateResult);
      findOneByStub.resolves(null);

      const updatedActivity = await updateActivity(mockDataObject);

      expect(updatedActivity).toBeNull();
    });

    it("Promise (update) rejects -> TypeORMError", async () => {
      updateStub.rejects(new TypeORMError());

      try {
        await updateActivity(mockDataObject);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise (update) rejects -> Error", async () => {
      updateStub.rejects();

      try {
        await updateActivity(mockDataObject);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (update) rejects -> Unknown type error", async () => {
      updateStub.rejects({});

      try {
        await updateActivity(mockDataObject);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (findOneBy) rejects -> TypeORMError", async () => {
      mockUpdateResult.affected = 1;
      updateStub.resolves(mockUpdateResult);
      findOneByStub.rejects(new TypeORMError());

      try {
        await updateActivity(mockDataObject);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise (findOneBy) rejects -> Error", async () => {
      mockUpdateResult.affected = 1;
      updateStub.resolves(mockUpdateResult);
      findOneByStub.rejects();

      try {
        await updateActivity(mockDataObject);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (findOneBy) rejects -> Unknown type error", async () => {
      mockUpdateResult.affected = 1;
      updateStub.resolves(mockUpdateResult);
      findOneByStub.rejects({});

      try {
        await updateActivity(mockDataObject);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe(`${deleteActivityById.name}`, () => {
    beforeEach(() => {
      // Reset stubs
      sinon.restore();

      // Stubs
      findOneByStub = sinon.stub(activityRepository, "findOneBy");
      removeStub = sinon.stub(activityRepository, "remove");

      // Mocks
      mockId = validCommonInputs.id;
      mockActivity = new Activity();
    });

    it("Promise resolves to Activity object", async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.resolves(mockActivity);

      const removedActivity = await deleteActivityById(mockId);

      expect(removedActivity).not.toBeNull();
      expect(removedActivity).toBeInstanceOf(Activity);
    });

    it("Promise (findOneBy) resolves to null", async () => {
      findOneByStub.resolves(null);

      const removedActivity = await deleteActivityById(mockId);

      expect(removedActivity).toBeNull();
    });

    it("Promise (findOneBy) rejects -> TypeORMError", async () => {
      findOneByStub.rejects(new TypeORMError());

      try {
        await deleteActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise (findOneBy) rejects -> Error", async () => {
      findOneByStub.rejects();

      try {
        await deleteActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (findOneBy) rejects -> Unknown type error", async () => {
      findOneByStub.rejects({});

      try {
        await deleteActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (remove) rejects -> TypeORMError", async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.rejects(new TypeORMError());

      try {
        await deleteActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise (remove) rejects -> Error", async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.rejects();

      try {
        await deleteActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (remove) rejects -> Unknown type error", async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.rejects({});

      try {
        await deleteActivityById(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe(`${deleteActivityByTitle.name}`, () => {
    beforeEach(() => {
      // Reset stubs
      sinon.restore();

      // Stubs
      findOneByStub = sinon.stub(activityRepository, "findOneBy");
      removeStub = sinon.stub(activityRepository, "remove");

      // Mocks
      mockTitle = validActivityInputs.title;
      mockActivity = new Activity();
      mockActivity.title = mockTitle;
    });

    it("Promise resolves to Activity object", async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.resolves(mockActivity);

      const removedActivity = await deleteActivityByTitle(mockTitle);

      expect(removedActivity).not.toBeNull();
      expect(removedActivity).toBeInstanceOf(Activity);
    });

    it("Promise (findOneBy) resolves to null", async () => {
      findOneByStub.resolves(null);

      const removedActivity = await deleteActivityByTitle(mockTitle);

      expect(removedActivity).toBeNull();
    });

    it("Promise (findOneBy) rejects -> TypeORMError", async () => {
      findOneByStub.rejects(new TypeORMError());

      try {
        await deleteActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise (findOneBy) rejects -> Error", async () => {
      findOneByStub.rejects();

      try {
        await deleteActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (findOneBy) rejects -> Unknown type error", async () => {
      findOneByStub.rejects({});

      try {
        await deleteActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (remove) rejects -> TypeORMError", async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.rejects(new TypeORMError());

      try {
        await deleteActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeORMError);
      }
    });

    it("Promise (remove) rejects -> Error", async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.rejects();

      try {
        await deleteActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it("Promise (remove) rejects -> Unknown type error", async () => {
      findOneByStub.resolves(mockActivity);
      removeStub.rejects({});

      try {
        await deleteActivityByTitle(mockTitle);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
