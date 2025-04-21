import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from "class-validator";
import { EmploymentStatus } from "enums/EmploymentStatus";
import { clientFailedValidation } from "messages/validation/clientValidationMessages";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { PHONE_NUMBER_REGEX } from "resources/regexp/validationRegExp";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "participants" })
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  @IsNotEmpty({
    message: commonFailedValidation.FIRST_NAME_REQUIRED_MESSAGE,
  })
  @IsString({
    message: commonFailedValidation.FIRST_NAME_INVALID_TYPE_MESSAGE,
  })
  @IsAlpha("en-US", {
    message: commonFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
  })
  firstName!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({
    message: commonFailedValidation.LAST_NAME_REQUIRED_MESSAGE,
  })
  @IsString({
    message: commonFailedValidation.LAST_NAME_INVALID_TYPE_MESSAGE,
  })
  @IsAlpha("en-US", {
    message: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
  })
  lastName!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({ message: commonFailedValidation.EMAIL_REQUIRED_MESSAGE })
  @IsEmail({}, { message: commonFailedValidation.EMAIL_INVALID_MESSAGE })
  email!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({ message: commonFailedValidation.PHONE_NUMBER_REQUIRED })
  @IsString({
    message: commonFailedValidation.PHONE_NUMBER_INVALID_TYPE_MESSAGE,
  })
  @Matches(PHONE_NUMBER_REGEX, {
    message: commonFailedValidation.PHONE_NUMBER_INVALID_FORMAT_MESSAGE,
  })
  phoneNumber!: string;

  @Column({ type: "enum", enum: EmploymentStatus })
  @Index()
  @IsNotEmpty({
    message: clientFailedValidation.EMPLOYMENT_STATUS_REQUIRED_MESSAGE,
  })
  @IsEnum(EmploymentStatus, {
    message: clientFailedValidation.EMPLOYMENT_STATUS_INVALID_MESSAGE,
  })
  employmentStatus!: EmploymentStatus;

  /**
   * TODO: Add userID when User entity is ready
   */
}
