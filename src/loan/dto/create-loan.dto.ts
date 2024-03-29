import { IsDateString, IsNumber } from 'class-validator';

export class CreateLoanDto {
  @IsNumber()
  book_id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  quantity: number;

  @IsDateString()
  due_date: Date;

  @IsDateString()
  loan_date: Date;
}
