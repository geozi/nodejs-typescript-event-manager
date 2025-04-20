import { IsAlpha, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { DeptCategory } from "enums/DeptCategory";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { staffFailedValidation } from "messages/validation/staffValidationMessages";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Staff {
  // Columns

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  @IsNotEmpty({ message: commonFailedValidation.FIRST_NAME_REQUIRED_MESSAGE })
  @IsString({ message: commonFailedValidation.FIRST_NAME_INVALID_TYPE_MESSAGE })
  @IsAlpha("en-US", {
    message: commonFailedValidation.FIRST_NAME_INVALID_FORMAT_MESSAGE,
  })
  firstName!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({ message: commonFailedValidation.LAST_NAME_REQUIRED_MESSAGE })
  @IsString({ message: commonFailedValidation.FIRST_NAME_INVALID_TYPE_MESSAGE })
  @IsAlpha("en-US", {
    message: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
  })
  lastName!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({ message: staffFailedValidation.JOB_TITLE_REQUIRED_MESSAGE })
  @IsString({ message: staffFailedValidation.JOB_TITLE_INVALID_TYPE_MESSAGE })
  jobTitle!: string;

  @Column({ type: "enum", enum: DeptCategory })
  @IsNotEmpty({ message: staffFailedValidation.DEPT_REQUIRED_MESSAGE })
  @IsEnum(DeptCategory, { message: staffFailedValidation.DEPT_INVALID_MESSAGE })
  department!: DeptCategory;

  // TODO: Add user ID when User entity is ready.
}
