import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { RoleType } from "enums/RoleType";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { userFailedValidation } from "messages/validation/userValidationMessages";
import { userConstants } from "resources/constants/userConstants";
import { PASSWORD_REGEX } from "resources/regexp/validationRegExp";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  // Columns
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  @IsNotEmpty({ message: userFailedValidation.USERNAME_REQUIRED_MESSAGE })
  @IsString({ message: userFailedValidation.USERNAME_INVALID_TYPE_MESSAGE })
  @MinLength(userConstants.USERNAME_MIN_LENGTH, {
    message: userFailedValidation.USERNAME_BELOW_MIN_MESSAGE,
  })
  @MaxLength(userConstants.USERNAME_MAX_LENGTH, {
    message: userFailedValidation.USERNAME_ABOVE_MAX_MESSAGE,
  })
  username!: string;

  @Column({ type: "varchar", unique: true })
  @IsNotEmpty({ message: commonFailedValidation.EMAIL_REQUIRED_MESSAGE })
  @IsEmail({}, { message: commonFailedValidation.EMAIL_INVALID_MESSAGE })
  email!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({ message: userFailedValidation.PASSWORD_REQUIRED_MESSAGE })
  @IsString({ message: userFailedValidation.PASSWORD_INVALID_TYPE_MESSAGE })
  @MinLength(userConstants.PASSWORD_MIN_LENGTH, {
    message: userFailedValidation.PASSWORD_BELOW_MIN_MESSAGE,
  })
  @Matches(PASSWORD_REGEX, {
    message: userFailedValidation.PASSWORD_INVALID_FORMAT_MESSAGE,
  })
  password!: string;

  @Column({ type: "enum", enum: RoleType })
  @Index()
  @IsNotEmpty({ message: userFailedValidation.ROLE_REQUIRED_MESSAGE })
  @IsEnum(RoleType, { message: userFailedValidation.ROLE_INVALID_MESSAGE })
  role!: RoleType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
