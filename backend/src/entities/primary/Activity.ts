import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ActivityType } from "enums/ActivityType";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { activityConstants } from "resources/constants/activityConstants";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Event } from "./Event";

@Entity({ name: "activities" })
export class Activity {
  // Columns
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  @IsNotEmpty({ message: activityFailedValidation.TITLE_REQUIRED_MESSAGE })
  @IsString({ message: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE })
  @MinLength(activityConstants.TITLE_MIN_LENGTH, {
    message: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
  })
  @MaxLength(activityConstants.TITLE_MAX_LENGTH, {
    message: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
  })
  title!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({
    message: activityFailedValidation.DESCRIPTION_REQUIRED_MESSAGE,
  })
  @IsString({
    message: activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
  })
  @MinLength(activityConstants.DESCRIPTION_MIN_LENGTH, {
    message: activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
  })
  @MaxLength(activityConstants.DESCRIPTION_MAX_LENGTH, {
    message: activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
  })
  description!: string;

  @Column({ type: "enum", enum: ActivityType })
  @Index()
  @IsNotEmpty({
    message: activityFailedValidation.ACTIVITY_TYPE_REQUIRED_MESSAGE,
  })
  @IsEnum(ActivityType, {
    message: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
  })
  activityType!: ActivityType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @ManyToMany(() => Event, (event) => event.activities)
  events!: Event[];
}
