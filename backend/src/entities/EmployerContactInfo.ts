import {
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { employerContactInfoFailedValidation } from "src/messages/validation/employerContactInfoValidationMessages";
import { employerContactInfoConstants } from "src/resources/constants/employerContactInfoConstants";
import {
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
} from "src/resources/regexp/validationRegExp";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class EmployerContactInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  @IsString({
    message:
      employerContactInfoFailedValidation.PHONE_NUMBER_INVALID_TYPE_MESSAGE,
  })
  @Length(
    employerContactInfoConstants.PHONE_NUMBER_LENGTH,
    employerContactInfoConstants.PHONE_NUMBER_LENGTH,
    {
      message:
        employerContactInfoFailedValidation.PHONE_NUMBER_OUT_OF_LENGTH_MESSAGE,
    }
  )
  @Matches(PHONE_NUMBER_REGEX, {
    message:
      employerContactInfoFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
  })
  phoneNumber!: string;

  @Column({ type: "varchar" })
  @IsEmail(
    {},
    { message: employerContactInfoFailedValidation.EMAIL_INVALID_MESSAGE }
  )
  email!: string;

  @Column({ type: "varchar" })
  @IsString({
    message:
      employerContactInfoFailedValidation.STREET_ADDRESS_INVALID_TYPE_MESSAGE,
  })
  @MinLength(employerContactInfoConstants.STREET_ADDRESS_MIN_LENGTH, {
    message:
      employerContactInfoFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
  })
  @MaxLength(employerContactInfoConstants.STREET_ADDRESS_MAX_LENGTH, {
    message:
      employerContactInfoFailedValidation.STREET_ADDRESS_ABOVE_MAX_LENGTH_MESSAGE,
  })
  streetAddress!: string;

  @Column({ type: "varchar" })
  @IsString({
    message: employerContactInfoFailedValidation.CITY_INVALID_TYPE_MESSAGE,
  })
  @MinLength(employerContactInfoConstants.CITY_MIN_LENGTH, {
    message: employerContactInfoFailedValidation.CITY_BELOW_MIN_LENGTH_MESSAGE,
  })
  @Matches(CITY_REGEX, {
    message: employerContactInfoFailedValidation.CITY_INVALID_FORMAT_MESSAGE,
  })
  city!: string;
}
