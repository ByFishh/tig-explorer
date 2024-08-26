import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['address', 'round'])
@Entity()
export class BlockReward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  height: number;

  @Index()
  @Column()
  round: number;

  @Index()
  @Column()
  block_id: string;

  @Index()
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
