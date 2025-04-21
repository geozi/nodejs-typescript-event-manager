export enum ActivityType {
  Panel = "Pane",
  Presentation = "Presentation",
  Workshop = "Workshop",
}

export const activityTypeAsObj = Object.fromEntries(
  Object.entries(ActivityType)
);
