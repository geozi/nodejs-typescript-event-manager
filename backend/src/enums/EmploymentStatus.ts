export enum EmploymentStatus {
  Employed = "Employed",
  Unemployed = "Unemployed",
}

export const employmentStatusAsObj = Object.fromEntries(
  Object.entries(EmploymentStatus)
);
