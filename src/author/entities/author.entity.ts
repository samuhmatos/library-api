import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '../../book/entities/book.entity';

@Entity({ name: 'author' })
export class Author {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @OneToMany(() => Book, (book) => book.author)
  books?: Book[];
}
