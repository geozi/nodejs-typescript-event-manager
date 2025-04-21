import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
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

  // Relations
  @ManyToOne(() => Event, (event) => event.clients)
  @PrimaryColumn()
  event!: Event;

  @ManyToOne(() => Client, (client) => client.events)
  @PrimaryColumn()
  client!: Client;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
