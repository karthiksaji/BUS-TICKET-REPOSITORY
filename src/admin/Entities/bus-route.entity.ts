import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BusRoute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  route: string;

  @Column()
  departureTime: string;

  @Column()
  arrivalTime: string;

  @Column()
  capacity: number;
}
