import { Employer } from "entities/primary/Employer";
import { Event } from "entities/primary/Event";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "event_employers" })
export class EventEmployer {
  // Columns
  @PrimaryColumn({ type: "int" })
  eventId!: number;

  @PrimaryColumn({ type: "int" })
  employerId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => Event, (event) => event.employers)
  @JoinColumn({ name: "eventId" })
  event!: Event;

  @ManyToOne(() => Employer, (employer) => employer.events)
  @JoinColumn({ name: "employerId" })
  employer!: Employer;
}
