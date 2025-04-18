import { SpecReporter } from "jasmine-spec-reporter";

// Clear the default Jasmine reporters
jasmine.getEnv().clearReporters();

// Add the SpecReporter
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displaySuccessful: true, // Ensures successful tests are displayed
      displayPending: true, // Shows pending tests
      displayFailed: true, // Shows failed tests
      displayDuration: true, // Displays how long each test took
      displayErrorMessages: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      displayStacktrace: "pretty" as any,
    },
  })
);
