import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlockReward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  height: number;

  @Column()
  round: number;

  @Column()
  block_id: string;

  @Column()
  address: string;

  @Column()
  c001: number;

  @Column()
  c002: number;

  @Column()
  c003: number;

  @Column()
  c004: number;

  @Column({
    type: 'decimal',
  })
  reward: number;
}
