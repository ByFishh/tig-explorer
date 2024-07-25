import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('block-table')
export class NodeEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  address: string;
}
