import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';

export type LoanRepository = Repository<Loan>;

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: LoanRepository,

    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const loan_date = new Date(createLoanDto.loan_date);
    const due_date = new Date(createLoanDto.due_date);

    if (loan_date >= due_date) {
      throw new BadRequestException(
        'The due date must be bigger than loan date',
      );
    }

    await this.userService.findById(createLoanDto.user_id);
    const book = await this.bookService.findById(createLoanDto.book_id);

    if (book.quantity < createLoanDto.quantity) {
      throw new BadRequestException(`The book quantity is not enough.`);
    }

    const loan = await this.loanRepository.save({
      ...createLoanDto,
      loan_date,
      due_date,
    });

    await this.bookService.updateQuantity(book.id, createLoanDto.quantity);

    return loan;
  }

  async findAll(): Promise<Loan[]> {
    return this.loanRepository.find({
      relations: {
        book: true,
        user: true,
      },
    });
  }

  async findById(id: number, relations?: boolean): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: relations && { book: true, user: true },
    });

    if (!loan) {
      throw new NotFoundException(`Loan id ${id} not found`);
    }

    return loan;
  }

  async finish(id: number): Promise<Loan> {
    const loan = await this.findById(id, true);

    const updateLoan = await this.loanRepository.save({
      ...loan,
      return_date: new Date(),
    });

    await this.bookService.updateQuantity(
      loan.book_id,
      loan.quantity + loan.book!.quantity,
    );

    return updateLoan;
  }
}
