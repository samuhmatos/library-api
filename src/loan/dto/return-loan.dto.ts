import { ReturnBookDto } from '../../book/dto/return-book.dto';
import { ReturnUserDto } from '../../user/dto';
import { Loan } from '../entities/loan.entity';

export class ReturnLoanDto {
  id: number;
  quantity: number;
  loan_date: Date;
  due_date: Date;
  return_date: Date;

  user?: ReturnUserDto;
  book?: ReturnBookDto;

  constructor(loan: Loan) {
    this.id = loan.id;
    this.quantity = loan.quantity;
    this.loan_date = loan.loan_date;
    this.due_date = loan.due_date;
    this.return_date = loan.return_date;

    if (loan.user) this.user = new ReturnUserDto(loan.user);

    if (loan.book) this.book = new ReturnBookDto(loan.book);
  }
}
