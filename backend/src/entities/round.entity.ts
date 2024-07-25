import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RoundEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  round: number;
}
