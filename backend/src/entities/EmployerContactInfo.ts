import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { employerContactInfoFailedValidation } from "messages/validation/employerContactInfoValidationMessages";
import { employerContactInfoConstants } from "resources/constants/employerContactInfoConstants";
import {
  CITY_REGEX,
  PHONE_NUMBER_REGEX,
} from "resources/regexp/validationRegExp";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "employer_contact_info" })
export class EmployerContactInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  @IsString({
    message:
      employerContactInfoFailedValidation.PHONE_NUMBER_INVALID_TYPE_MESSAGE,
  })
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
