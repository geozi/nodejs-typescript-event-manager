import { Event } from "entities/primary/Event";
import { Staff } from "entities/primary/Staff";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "event_staff_members" })
export class EventStaff {
  // Columns
  @PrimaryColumn({ type: "int" })
  eventId!: number;

  @PrimaryColumn({ type: "int" })
  staffId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => Event, (event) => event.staffMembers)
  @JoinColumn({ name: "eventId" })
  event!: Event;

  @ManyToOne(() => Staff, (staff) => staff.events)
  @JoinColumn({ name: "staffId" })
  staffMember!: Staff;
}
