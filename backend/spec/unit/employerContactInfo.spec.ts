import { validateSync } from "class-validator";
import { EmployerContactInfo } from "entities/EmployerContactInfo";
import { LocalCities } from "enums/LocalCityList";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { employerContactInfoFailedValidation } from "messages/validation/employerContactInfoValidationMessages";
import {
  invalidEmployerContactInfoInputs,
  validEmployerContactInfoInputs,
} from "spec/testInputs";

describe("EmployerContactInfo entity unit tests", () => {
  let mockEmployerContactInfo: EmployerContactInfo;

  describe("Positive scenario", () => {
    beforeEach(() => {
      mockEmployerContactInfo = new EmployerContactInfo();
      mockEmployerContactInfo.id = validEmployerContactInfoInputs.id;
      mockEmployerContactInfo.phoneNumber =
        validEmployerContactInfoInputs.phoneNumber;
      mockEmployerContactInfo.email = validEmployerContactInfoInputs.email;
      mockEmployerContactInfo.streetAddress =
        validEmployerContactInfoInputs.streetAddress;
      mockEmployerContactInfo.city = validEmployerContactInfoInputs.city;
    });

    it("employerContactInfo has valid inputs", () => {
      const errors = validateSync(mockEmployerContactInfo);

      expect(errors.length).toEqual(0);
      expect(mockEmployerContactInfo.toString()).toEqual(
        validEmployerContactInfoInputs.toString()
      );
    });
  });

  describe("Negative scenarios", () => {
    describe("validation-oriented", () => {
      beforeEach(() => {
        mockEmployerContactInfo = new EmployerContactInfo();
        mockEmployerContactInfo.id = validEmployerContactInfoInputs.id;
        mockEmployerContactInfo.phoneNumber =
          validEmployerContactInfoInputs.phoneNumber;
        mockEmployerContactInfo.email = validEmployerContactInfoInputs.email;
        mockEmployerContactInfo.streetAddress =
          validEmployerContactInfoInputs.streetAddress;
        mockEmployerContactInfo.city = validEmployerContactInfoInputs.city;
      });

      it("phoneNumber is too short", () => {
        mockEmployerContactInfo.phoneNumber =
          invalidEmployerContactInfoInputs.PHONE_NUMBER_TOO_SHORT;

        const errors = validateSync(mockEmployerContactInfo);

        expect(errors[0].value).toEqual(
          invalidEmployerContactInfoInputs.PHONE_NUMBER_TOO_SHORT
        );
        expect(errors[0].constraints).toEqual({
          matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
        });
      });

      it("phoneNumber is too long", () => {
        mockEmployerContactInfo.phoneNumber =
          invalidEmployerContactInfoInputs.PHONE_NUMBER_TOO_LONG;

        const errors = validateSync(mockEmployerContactInfo);

        expect(errors[0].value).toEqual(
          invalidEmployerContactInfoInputs.PHONE_NUMBER_TOO_LONG
        );
        expect(errors[0].constraints).toEqual({
          matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
        });
      });

      it("phoneNumber has invalid format", () => {
        mockEmployerContactInfo.phoneNumber =
          invalidEmployerContactInfoInputs.PHONE_NUMBER_INVALID_FORMAT;

        const errors = validateSync(mockEmployerContactInfo);

        expect(errors[0].value).toEqual(
          invalidEmployerContactInfoInputs.PHONE_NUMBER_INVALID_FORMAT
        );
        expect(errors[0].constraints).toEqual({
          matches: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
        });
      });

      invalidEmployerContactInfoInputs.EMAIL_INVALID_CASES.forEach(
        ([testName, invalidEmail]) => {
          it(testName, () => {
            mockEmployerContactInfo.email = invalidEmail;

            const errors = validateSync(mockEmployerContactInfo);

            expect(errors[0].value).toEqual(invalidEmail);
            expect(errors[0].constraints).toEqual({
              isEmail: commonFailedValidation.EMAIL_INVALID_MESSAGE,
            });
          });
        }
      );

      it("street address is too short", () => {
        mockEmployerContactInfo.streetAddress =
          invalidEmployerContactInfoInputs.STREET_ADDRESS_TOO_SHORT;

        const errors = validateSync(mockEmployerContactInfo);

        expect(errors[0].value).toEqual(
          invalidEmployerContactInfoInputs.STREET_ADDRESS_TOO_SHORT
        );
        expect(errors[0].constraints).toEqual({
          minLength:
            employerContactInfoFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
        });
      });

      it("street address is too long", () => {
        mockEmployerContactInfo.streetAddress =
          invalidEmployerContactInfoInputs.STREET_ADDRESS_TOO_LONG;

        const errors = validateSync(mockEmployerContactInfo);

        expect(errors[0].value).toEqual(
          invalidEmployerContactInfoInputs.STREET_ADDRESS_TOO_LONG
        );
        expect(errors[0].constraints).toEqual({
          maxLength:
            employerContactInfoFailedValidation.STREET_ADDRESS_ABOVE_MAX_LENGTH_MESSAGE,
        });
      });

      it("city is invalid", () => {
        mockEmployerContactInfo.city =
          invalidEmployerContactInfoInputs.CITY_INVALID as LocalCities;

        const errors = validateSync(mockEmployerContactInfo);

        expect(errors[0].value).toEqual(
          invalidEmployerContactInfoInputs.CITY_INVALID
        );
        expect(errors[0].constraints).toEqual({
          isEnum: employerContactInfoFailedValidation.CITY_INVALID_MESSAGE,
        });
      });
    });
  });
});
