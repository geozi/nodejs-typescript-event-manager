import { Activity } from "entities/primary/Activity";
import { Event } from "entities/primary/Event";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "event_activities" })
export class EventActivity {
  // Columns
  @PrimaryColumn({ type: "int" })
  eventId!: number;

  @PrimaryColumn({ type: "int" })
  activityId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => Event, (event) => event.activities)
  @JoinColumn({ name: "eventId" })
  event!: Event;

  @ManyToOne(() => Activity, (activity) => activity.events)
  activity!: Activity;
}
