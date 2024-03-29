import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Loan } from '../../loan/entities/loan.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address?: string;

  @Column()
  password: string;

  @Column()
  type_user: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @OneToMany(() => Loan, (loan) => loan.book)
  loans?: Loan[];
}
