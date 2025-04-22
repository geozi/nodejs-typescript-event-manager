import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { Event } from "./Event";

@Entity({ name: "event_clients" })
export class EventClient {
  // Columns
  @Column({ type: "varchar" })
  @Generated("uuid")
  ticketId!: string;

  @PrimaryColumn({ type: "int" })
  eventId!: number;
  @PrimaryColumn({ type: "int" })
  clientId!: number;

  // Relations
  @ManyToOne(() => Event, (event) => event.clients)
  @JoinColumn({ name: "eventId" })
  event!: Event;

  @ManyToOne(() => Client, (client) => client.events)
  @JoinColumn({ name: "clientId" })
  client!: Client;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
