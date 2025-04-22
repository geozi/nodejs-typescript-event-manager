import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { EventStatus } from "enums/EventStatus";
import { eventFailedValidation } from "messages/validation/eventValidationMessages";
import { eventConstants } from "resources/constants/eventConstants";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Activity } from "./Activity";
import { Employer } from "./Employer";
import { EventClient } from "./EventClient";
import { Staff } from "./Staff";

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
  @ManyToMany(() => Employer, (employer) => employer.events)
  @JoinTable({ name: "event_employers" })
  employers!: Employer[];

  @ManyToMany(() => Staff, (staff) => staff.events)
  @JoinTable({ name: "event_staff_members" })
  staffMembers!: Staff[];

  @ManyToMany(() => Activity, (activity) => activity.events)
  @JoinTable({ name: "event_activities" })
  activities!: Activity[];

  @OneToMany(() => EventClient, (eventClient) => eventClient.event)
  clients!: EventClient[];
}
