import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from "class-validator";
import { EmploymentStatus } from "enums/EmploymentStatus";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { participantFailedValidation } from "messages/validation/participantValidationMessages";
import {
  PHONE_NUMBER_REGEX,
  TICKET_ID_REGEX,
} from "resources/regexp/validationRegExp";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "participants" })
export class Participant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  @IsNotEmpty({
    message: participantFailedValidation.FIRST_NAME_REQUIRED_MESSAGE,
  })
  @IsString({
    message: participantFailedValidation.FIRST_NAME_INVALID_TYPE_MESSAGE,
  })
  @IsAlpha("en-US", {
    message: participantFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
  })
  firstName!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({
    message: participantFailedValidation.LAST_NAME_REQUIRED_MESSAGE,
  })
  @IsString({
    message: participantFailedValidation.LAST_NAME_INVALID_TYPE_MESSAGE,
  })
  @IsAlpha("en-US", {
    message: participantFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
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
    message: participantFailedValidation.EMPLOYMENT_STATUS_REQUIRED_MESSAGE,
  })
  @IsEnum(EmploymentStatus, {
    message: participantFailedValidation.EMPLOYMENT_STATUS_INVALID_MESSAGE,
  })
  employmentStatus!: EmploymentStatus;

  @Column({ type: "varchar", unique: true })
  @IsNotEmpty({
    message: participantFailedValidation.TICKET_ID_REQUIRED_MESSAGE,
  })
  @IsString({
    message: participantFailedValidation.TICKET_ID_INVALID_TYPE_MESSAGE,
  })
  @Matches(TICKET_ID_REGEX, {
    message: participantFailedValidation.TICKET_ID_INVALID_FORMAT_MESSAGE,
  })
  readonly ticketID!: string;
}
