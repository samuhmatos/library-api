import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { ReturnLoanDto } from './dto/return-loan.dto';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';

@Roles(UserType.Admin)
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    return this.loanService.create(createLoanDto);
  }

  @Get()
  async findAll(): Promise<ReturnLoanDto[]> {
    const loans = await this.loanService.findAll();
    return loans.map((loan) => new ReturnLoanDto(loan));
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ReturnLoanDto> {
    const loan = await this.loanService.findById(id, true);
    return new ReturnLoanDto(loan);
  }

  @Patch(':id')
  async finish(@Param('id') id: number): Promise<Loan> {
    return this.loanService.finish(id);
  }
}
