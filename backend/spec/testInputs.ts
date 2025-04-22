import { EventClient } from "entities/intermediary/EventClient";
import { Activity } from "entities/primary/Activity";
import { Employer } from "entities/primary/Employer";
import { EmployerContactInfo } from "entities/primary/EmployerContactInfo";
import { Event } from "entities/primary/Event";
import { Staff } from "entities/primary/Staff";
import { User } from "entities/primary/User";
import { ActivityType } from "enums/ActivityType";
import { DeptCategory } from "enums/DeptCategory";
import { EmploymentStatus } from "enums/EmploymentStatus";
import { EventStatus } from "enums/EventStatus";
import { IndustryType } from "enums/IndustryType";
import { LocalCities } from "enums/LocalCityList";
import { RoleType } from "enums/RoleType";

export const validEmployerInputs = {
  companyName: "Tech solutions",
  industry: IndustryType.InformationTechnology,
  employerContactInfo: new EmployerContactInfo(),
};

export const invalidEmployerInputs = {
  COMPANY_NAME_INVALID_TYPE: 12,
  COMPANY_NAME_TOO_SHORT: "C",
  COMPANY_NAME_TOO_LONG: `International Association for Advanced Technological Innovations and Sustainable Development`,
  INDUSTRY_TYPE_INVALID: "Leisure Activities" as IndustryType,
};

export const validEmployerContactInfoInputs = {
  streetAddress: "Acropolis 1",
  city: LocalCities.Athens,
};

export const invalidEmployerContactInfoInputs = {
  STREET_ADDRESS_TOO_SHORT: "St.",
  STREET_ADDRESS_TOO_LONG: `12345 Grand Avenue, Apartment 678, Eastwood Business Plaza, Building 9, Suite 452A, Springfield, IL, 62704, United States`,
  CITY_INVALID: "New York" as LocalCities,
};

export const validClientInputs = {
  employmentStatus: EmploymentStatus.Unemployed,
  events: [new EventClient(), new EventClient()],
};

export const invalidClientInputs = {
  EMPLOYMENT_STATUS_INVALID: "Too employed" as EmploymentStatus,
};

export const validCommonInputs = {
  id: 1,
  firstName: "Jayson",
  lastName: "Johnson",
  email: "mymail@mail.com",
  phoneNumber: "6999999999",
  createdAt: new Date(),
  updatedAt: new Date(),
  events: [new Event(), new Event()],
  user: new User(),
};

export const invalidCommonInputs = {
  FIRST_NAME_INVALID: "Ja1s0n*",
  LAST_NAME_INVALID: "J0hns0n",
  PHONE_NUMBER_TOO_SHORT: "6999",
  PHONE_NUMBER_TOO_LONG: "6999999999999",
  PHONE_NUMBER_INVALID_FORMAT: "699-99-999",
  EMAIL_INVALID_CASES: [
    ["email has no prefix", "@mail.com"],
    ["email has no @", "randommail.com"],
    ["email has no domain name", "random@.com"],
    ["email has no .", "random@mailcom"],
    ["email has no top level domain", "random@mail."],
  ] as [string, string][],
};

export const validStaffInputs = {
  jobTitle: "Talent recruiter",
  department: DeptCategory.Recruitment,
};

export const invalidStaffInputs = {
  DEPT_INVALID: "Testing Department" as DeptCategory,
};

export const validActivityInputs = {
  title: "CV creation",
  description: "Learn how to make a successful CV",
  activityType: ActivityType.Workshop,
};

export const invalidActivityInputs = {
  TITLE_TOO_SHORT: "C",
  TITLE_TOO_LONG: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas`,
  DESCRIPTION_TOO_SHORT: "Desc",
  DESCRIPTION_TOO_LONG: `Pellentesque fermentum facilisis hendrerit. Vivamus venenatis dapibus sem, sit amet placerat tortor blandit eget. Nullam id augue vitae nulla interdum pharetra ut et turpis. Etiam nisl mauris, feugiat malesuada mi sed, vestibulum commodo lectus. Donec convallis ac tortor vitae tincidunt. Praesent ut ligula elit. Morbi eget mi ex. Curabitur quis dignissim eros. Suspendisse id massa at velit maximus ultrices. Suspendisse euismod rhoncus sapien, sit amet pretium arcu mollis a. Cras commodo lacus erat, gravida congue ipsum condimentum nec. In lacinia nunc sagittis mauris ullamcorper interdum. Pellentesque ac risus consequat orci congue malesuada in nec mi. Donec eleifend id nunc quis semper. Sed consequat metus non accumsan rutrum.`,
  ACTIVITY_TYPE_INVALID: "Exercise" as ActivityType,
};

export const validEventInputs = {
  name: "Some event name",
  summary: "This is the description of an event.",
  startingDate: new Date(),
  endingDate: new Date(),
  status: EventStatus.Active,
  employers: [new Employer(), new Employer()],
  staffMembers: [new Staff(), new Staff()],
  activities: [new Activity(), new Activity()],
  clients: [new EventClient(), new EventClient()],
};

export const invalidEventInputs = {
  NAME_TOO_SHORT: "Event",
  NAME_TOO_LONG: `Donec convallis, libero pretium accumsan viverra, felis diam venenatis massa, et vulputate magna nibh et urna`,
  SUMMARY_TOO_SHORT: `Summary`,
  SUMMARY_TOO_LONG: `Fusce at nunc lacinia, bibendum neque in, pharetra elit. Fusce orci justo, elementum vel mi sit amet, ultrices tempor eros. Ut placerat massa et velit tempor, id congue urna mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim neque non mattis blandit. Integer eget placerat erat. Donec tempor lorem ipsum, sed imperdiet sem rhoncus vel. Nullam nulla ligula, malesuada quis enim vel, ultrices dapibus mauris. In et justo non elit molestie dapibus sed eu velit. Donec semper, orci ut cursus egestas, nibh urna fringilla tortor, a blandit tellus libero vitae massa. Suspendisse fermentum ex vel volutpat luctus. Etiam ut venenatis leo.`,
  STATUS_INVALID: "Pending" as EventStatus,
};

export const validUserInput = {
  username: "newUser",
  email: "random@mail.com",
  password: "5W]L8t1m4@PcTTO",
  role: RoleType.User,
};

export const invalidUserInputs = {
  TOO_SHORT_USERNAME: "ab",
  TOO_LONG_USERNAME: "thisIsAVeryLongUsernameToTest",
  TOO_SHORT_PASSWORD: "E^e;0=",
  PASSWORD_INVALID_CASES: [
    ["password has no uppercase letters", "!]i&u^^.57h3.,%"],
    ["password has no lowercase letters", "+[Q]D~~A,9CGYZ~"],
    ["password has no numbers", "Q}_MC}mdguOs!Gr"],
    ["password has no special symbols", "EyB0McqoXAOYA1Y"],
  ] as [string, string][],
  ROLE_INVALID: "Executive" as RoleType,
};
