import { ActivityType } from "enums/ActivityType";
import { check, ValidationChain } from "express-validator";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { activityConstants } from "resources/constants/activityConstants";

export const activityAdditionRules = (): ValidationChain[] => {
  return [
    check("title")
      .notEmpty()
      .withMessage(activityFailedValidation.TITLE_REQUIRED_MESSAGE)
      .bail()
      .isString()
      .withMessage(activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE)
      .bail()
      .isLength({ min: activityConstants.TITLE_MIN_LENGTH })
      .withMessage(activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: activityConstants.TITLE_MAX_LENGTH })
      .withMessage(activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE),
    check("description")
      .notEmpty()
      .withMessage(activityFailedValidation.DESCRIPTION_REQUIRED_MESSAGE)
      .bail()
      .isString()
      .withMessage(activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE)
      .bail()
      .isLength({ min: activityConstants.DESCRIPTION_MIN_LENGTH })
      .withMessage(
        activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE
      )
      .isLength({ max: activityConstants.DESCRIPTION_MAX_LENGTH })
      .withMessage(
        activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE
      ),
    check("activityType")
      .notEmpty()
      .withMessage(activityFailedValidation.ACTIVITY_TYPE_REQUIRED_MESSAGE)
      .bail()
      .isString()
      .withMessage(activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE)
      .bail()
      .isIn(Object.values(ActivityType))
      .withMessage(activityFailedValidation.ACTIVITY_TYPE_WRONG_ENUM_MESSAGE),
  ];
};

export const activityUpdateRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(commonFailedValidation.ID_REQUIRED_MESSAGE)
      .bail()
      .custom(async (value) => {
        if (typeof value !== "number" || !Number.isInteger(value)) {
          throw new Error(commonFailedValidation.ID_INVALID_TYPE_MESSAGE);
        }
        return true;
      })
      .bail()
      .custom(async (value) => {
        if (value < 0) {
          throw new Error(commonFailedValidation.ID_NEGATIVE_MESSAGE);
        }
        return true;
      }),
    check("title")
      .optional()
      .isString()
      .withMessage(activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE)
      .bail()
      .isLength({ min: activityConstants.TITLE_MIN_LENGTH })
      .withMessage(activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: activityConstants.TITLE_MAX_LENGTH })
      .withMessage(activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE),
    check("description")
      .optional()
      .isString()
      .withMessage(activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE)
      .bail()
      .isLength({ min: activityConstants.DESCRIPTION_MIN_LENGTH })
      .withMessage(
        activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE
      )
      .isLength({ max: activityConstants.DESCRIPTION_MAX_LENGTH })
      .withMessage(
        activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE
      ),
    check("activityType")
      .optional()
      .isString()
      .withMessage(activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE)
      .bail()
      .isIn(Object.values(ActivityType))
      .withMessage(activityFailedValidation.ACTIVITY_TYPE_WRONG_ENUM_MESSAGE),
  ];
};

export const activityRetrievalByIdRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(commonFailedValidation.ID_REQUIRED_MESSAGE)
      .bail()
      .custom(async (value) => {
        if (typeof value !== "number" || !Number.isInteger(value)) {
          throw new Error(commonFailedValidation.ID_INVALID_TYPE_MESSAGE);
        }
        return true;
      })
      .bail()
      .custom(async (value) => {
        if (value < 0) {
          throw new Error(commonFailedValidation.ID_NEGATIVE_MESSAGE);
        }
        return true;
      }),
  ];
};

export const activityRetrievalByTitleRules = (): ValidationChain[] => {
  return [
    check("title")
      .notEmpty()
      .withMessage(activityFailedValidation.TITLE_REQUIRED_MESSAGE)
      .bail()
      .isString()
      .withMessage(activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE)
      .bail()
      .isLength({ min: activityConstants.TITLE_MIN_LENGTH })
      .withMessage(activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: activityConstants.TITLE_MAX_LENGTH })
      .withMessage(activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE),
  ];
};

export const activityRetrievalByTypeRules = (): ValidationChain[] => {
  return [
    check("activityType")
      .notEmpty()
      .withMessage(activityFailedValidation.ACTIVITY_TYPE_REQUIRED_MESSAGE)
      .bail()
      .isString()
      .withMessage(activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE)
      .bail()
      .isIn(Object.values(ActivityType))
      .withMessage(activityFailedValidation.ACTIVITY_TYPE_WRONG_ENUM_MESSAGE),
  ];
};

export const activityRemovalByIdRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(commonFailedValidation.ID_REQUIRED_MESSAGE)
      .bail()
      .custom(async (value) => {
        if (typeof value !== "number" || !Number.isInteger(value)) {
          throw new Error(commonFailedValidation.ID_INVALID_TYPE_MESSAGE);
        }
        return true;
      })
      .bail()
      .custom(async (value) => {
        if (value < 0) {
          throw new Error(commonFailedValidation.ID_NEGATIVE_MESSAGE);
        }
        return true;
      }),
  ];
};

export const activityRemovalByTitleRules = (): ValidationChain[] => {
  return [
    check("title")
      .notEmpty()
      .withMessage(activityFailedValidation.TITLE_REQUIRED_MESSAGE)
      .bail()
      .isString()
      .withMessage(activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE)
      .bail()
      .isLength({ min: activityConstants.TITLE_MIN_LENGTH })
      .withMessage(activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE)
      .isLength({ max: activityConstants.TITLE_MAX_LENGTH })
      .withMessage(activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE),
  ];
};
