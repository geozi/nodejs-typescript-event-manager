import { Event } from "entities/primary/Event";
import { StaffMember } from "entities/primary/StaffMember";
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
  staffMemberId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => Event, (event) => event.staffMembers)
  @JoinColumn({ name: "eventId" })
  event!: Event;

  @ManyToOne(() => StaffMember, (staffMember) => staffMember.events)
  @JoinColumn({ name: "staffMemberId" })
  staffMember!: StaffMember;
}
