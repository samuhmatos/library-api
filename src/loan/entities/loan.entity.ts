import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Book } from '../../book/entities/book.entity';

@Entity({ name: 'loan' })
export class Loan {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  book_id: number;

  @Column()
  user_id: number;

  @Column()
  quantity: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  loan_date: Date;

  @Column({
    type: 'timestamp',
  })
  due_date: Date;

  @Column({
    type: 'timestamp',
  })
  return_date: Date;

  @ManyToOne(() => User, (user) => user.loans)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => Book, (book) => book.loans)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book?: Book;
}
