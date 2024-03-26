import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  resume: string;

  @Column()
  author_id: number;

  @Column()
  quantity: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;
}
