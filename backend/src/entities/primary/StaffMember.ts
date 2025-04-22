import { IsAlpha, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EventStaff } from "entities/intermediary/EventStaff";
import { DeptCategory } from "enums/DeptCategory";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { staffFailedValidation } from "messages/validation/staffValidationMessages";
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
import { User } from "./User";

@Entity({ name: "staff_members" })
export class StaffMember {
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
  @IsString({ message: commonFailedValidation.LAST_NAME_INVALID_TYPE_MESSAGE })
  @IsAlpha("en-US", {
    message: commonFailedValidation.LAST_NAME_INVALID_FORMAT_MESSAGE,
  })
  lastName!: string;

  @Column({ type: "varchar" })
  @Index()
  @IsNotEmpty({ message: staffFailedValidation.JOB_TITLE_REQUIRED_MESSAGE })
  @IsString({ message: staffFailedValidation.JOB_TITLE_INVALID_TYPE_MESSAGE })
  jobTitle!: string;

  @Column({ type: "enum", enum: DeptCategory })
  @Index()
  @IsNotEmpty({ message: staffFailedValidation.DEPT_REQUIRED_MESSAGE })
  @IsEnum(DeptCategory, { message: staffFailedValidation.DEPT_INVALID_MESSAGE })
  department!: DeptCategory;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @OneToMany(() => EventStaff, (eventStaff) => eventStaff.staffMember)
  events!: EventStaff[];

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
