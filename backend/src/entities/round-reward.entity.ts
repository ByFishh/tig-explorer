import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoundReward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  round: number;

  @Column()
  address: string;

  @Column('decimal')
  reward: number;
}
