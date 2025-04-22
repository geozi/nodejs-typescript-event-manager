import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { EventEmployer } from "entities/intermediary/EventEmployer";
import { IndustryType } from "enums/IndustryType";
import { employerFailedValidationMessages } from "messages/validation/employerValidationMessages";
import { employerConstants } from "resources/constants/employerConstants";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EmployerContactInfo } from "./EmployerContactInfo";

@Entity({ name: "employers" })
export class Employer {
  // Columns
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  @IsNotEmpty({
    message: employerFailedValidationMessages.COMPANY_NAME_REQUIRED_MESSAGE,
  })
  @IsString({
    message: employerFailedValidationMessages.COMPANY_NAME_INVALID_TYPE_MESSAGE,
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
  @IsNotEmpty({
    message: employerFailedValidationMessages.INDUSTRY_REQUIRED_MESSAGE,
  })
  @IsEnum(IndustryType, {
    message: employerFailedValidationMessages.INDUSTRY_INVALID_MESSAGE,
  })
  industry!: IndustryType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations

  @OneToOne(() => EmployerContactInfo)
  @JoinColumn()
  employerContactInfo!: EmployerContactInfo;

  @OneToMany(() => EventEmployer, (eventEmployer) => eventEmployer.employer)
  events!: EventEmployer[];
}
