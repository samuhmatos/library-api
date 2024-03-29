import { userMock } from '../../user/__mocks__';
import { Loan } from '../entities/loan.entity';
import { bookMock } from '../../book/__mocks__/book.mock';

const date = new Date();

export const loanMock: Loan = {
  id: 1,
  quantity: 4,
  loan_date: new Date(),
  due_date: new Date(date.setDate(date.getDate() + 3)),
  return_date: null,
  user_id: userMock.id,
  book_id: bookMock.id,
  book: bookMock,
  user: userMock,
};

export const finishLoanMock: Loan = {
  ...loanMock,
  return_date: new Date(),
};
