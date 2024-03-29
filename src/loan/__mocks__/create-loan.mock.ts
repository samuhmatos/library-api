import { bookMock } from '../../book/__mocks__/book.mock';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { userMock } from '../../user/__mocks__';
import { loanMock } from './loan.mock';

export const createLoanMock: CreateLoanDto = {
  book_id: bookMock.id,
  user_id: userMock.id,
  quantity: loanMock.quantity,
  due_date: loanMock.due_date,
  loan_date: loanMock.loan_date,
};

export const createLoanWithInvalidDueDateMock: CreateLoanDto = {
  ...createLoanMock,
  due_date: loanMock.loan_date,
};
