import { deptCategoryAsObj } from "enums/DeptCategory";

export const staffFailedValidation = {
  JOB_TITLE_REQUIRED_MESSAGE: "Job title is a required field",
  JOB_TITLE_INVALID_TYPE_MESSAGE: "Job title must be a string",
  DEPT_REQUIRED_MESSAGE: "Department is a required field",
  DEPT_INVALID_MESSAGE: `Department must be one of the following: ${Object.values(
    deptCategoryAsObj
  )}`,
};
