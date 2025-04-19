import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { IndustryType } from "enums/IndustryType";
import { employerFailedValidationMessages } from "messages/validation/employerValidationMessages";
import { employerConstants } from "resources/constants/employerConstants";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployerContactInfo } from "./EmployerContactInfo";

@Entity()
export class Employer {
  // Columns

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  @Index()
  @IsString({
    message: employerFailedValidationMessages.COMPANY_NAME_INVALID_MESSAGE,
  })
  @MinLength(employerConstants.COMPANY_NAME_MIN_LENGTH, {
    message:
      employerFailedValidationMessages.COMPANY_NAME_BELOW_MIN_LENGTH_MESSAGE,
  })
  @MaxLength(employerConstants.COMPANY_NAME_MAX_LENGTH, {
    message:
      employerFailedValidationMessages.COMPANY_NAME_ABOVE_MAX_LENGTH_MESSAGE,
  })
  companyName!: string;

  @Column({ type: "enum", enum: IndustryType })
  @Index()
  @IsEnum(IndustryType, {
    message: employerFailedValidationMessages.INDUSTRY_INVALID_MESSAGE,
  })
  industry!: IndustryType;

  // Relations

  @OneToOne(() => EmployerContactInfo)
  @JoinColumn()
  employerContactInfo!: EmployerContactInfo;
}
