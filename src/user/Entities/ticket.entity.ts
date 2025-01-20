import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  passengerName: string;

  @Column()
  route: string;

  @Column()
  status: string;
}
