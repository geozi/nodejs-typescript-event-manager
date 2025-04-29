import {
  callActivityCreation,
  callActivityRemovalById,
  callActivityRemovalByTitle,
  callActivityRetrievalById,
  callActivityRetrievalByTitle,
  callActivityRetrievalByType,
  callActivityUpdate,
} from "controllers/activityController";
import { Router } from "express";
import { catchExpressValidationErrors } from "middleware/catchers/expressErrorCatcher";
import {
  activityAdditionRules,
  activityRemovalByIdRules,
  activityRemovalByTitleRules,
  activityRetrievalByIdRules,
  activityRetrievalByTitleRules,
  activityRetrievalByTypeRules,
  activityUpdateRules,
} from "middleware/rules/activityRules";

export const activityRouter = Router();
activityRouter.get(
  "/",
  ...activityRetrievalByIdRules(),
  catchExpressValidationErrors,
  callActivityRetrievalById
);
activityRouter.get(
  "/title",
  ...activityRetrievalByTitleRules(),
  catchExpressValidationErrors,
  callActivityRetrievalByTitle
);
activityRouter.get(
  "/type",
  ...activityRetrievalByTypeRules(),
  catchExpressValidationErrors,
  callActivityRetrievalByType
);
activityRouter.post(
  "/",
  ...activityAdditionRules(),
  catchExpressValidationErrors,
  callActivityCreation
);
activityRouter.put(
  "/",
  ...activityUpdateRules(),
  catchExpressValidationErrors,
  callActivityUpdate
);
activityRouter.delete(
  "/",
  ...activityRemovalByIdRules(),
  catchExpressValidationErrors,
  callActivityRemovalById
);
activityRouter.delete(
  "/title",
  ...activityRemovalByTitleRules(),
  catchExpressValidationErrors,
  callActivityRemovalByTitle
);
