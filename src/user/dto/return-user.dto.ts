import { ReturnLoanDto } from '../../loan/dto/return-loan.dto';
import { User } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;

  loans?: ReturnLoanDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;

    if (user.loans)
      this.loans = user.loans.map((loan) => new ReturnLoanDto(loan));
  }
}
