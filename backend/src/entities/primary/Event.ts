import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { EventActivity } from "entities/intermediary/EventActivity";
import { EventEmployer } from "entities/intermediary/EventEmployer";
import { EventStaffMember } from "entities/intermediary/EventStaffMember";
import { EventStatus } from "enums/EventStatus";
import { eventFailedValidation } from "messages/validation/eventValidationMessages";
import { eventConstants } from "resources/constants/eventConstants";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EventClient } from "../intermediary/EventClient";

@Entity({ name: "events" })
export class Event {
  // Columns
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  @IsNotEmpty({ message: eventFailedValidation.NAME_REQUIRED_MESSAGE })
  @IsString({ message: eventFailedValidation.NAME_INVALID_TYPE_MESSAGE })
  @MinLength(eventConstants.NAME_MIN, {
    message: eventFailedValidation.NAME_BELOW_MIN_MESSAGE,
  })
  @MaxLength(eventConstants.NAME_MAX, {
    message: eventFailedValidation.NAME_ABOVE_MAX_MESSAGE,
  })
  name!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty({ message: eventFailedValidation.SUMMARY_REQUIRED_MESSAGE })
  @IsString({ message: eventFailedValidation.SUMMARY_INVALID_TYPE_MESSAGE })
  @MinLength(eventConstants.SUMMARY_MIN, {
    message: eventFailedValidation.SUMMARY_BELOW_MIN_MESSAGE,
  })
  @MaxLength(eventConstants.SUMMARY_MAX, {
    message: eventFailedValidation.SUMMARY_ABOVE_MAX_MESSAGE,
  })
  summary!: string;

  @Column({ type: "date" })
  @IsNotEmpty({ message: eventFailedValidation.STARTING_DATE_REQUIRED_MESSAGE })
  @IsDate({ message: eventFailedValidation.STARTING_DATE_INVALID_MESSAGE })
  startingDate!: Date;

  @Column({ type: "date" })
  @IsNotEmpty({ message: eventFailedValidation.ENDING_DATE__REQUIRED_MESSAGE })
  @IsDate({ message: eventFailedValidation.ENDING_DATE_INVALID_MESSAGE })
  endingDate!: Date;

  @Column({ type: "enum", enum: EventStatus })
  @Index()
  @IsNotEmpty({ message: eventFailedValidation.STATUS_REQUIRED_MESSAGE })
  @IsEnum(EventStatus, {
    message: eventFailedValidation.STATUS_INVALID_MESSAGE,
  })
  status!: EventStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @OneToMany(() => EventEmployer, (eventEmployer) => eventEmployer.event)
  employers!: EventEmployer[];

  @OneToMany(() => EventActivity, (eventActivity) => eventActivity.event)
  activities!: EventActivity[];

  @OneToMany(() => EventClient, (eventClient) => eventClient.event)
  clients!: EventClient[];

  @OneToMany(
    () => EventStaffMember,
    (eventStaffMember) => eventStaffMember.event
  )
  staffMembers!: EventStaffMember[];
}
