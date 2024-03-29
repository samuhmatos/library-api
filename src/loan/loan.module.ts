import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';

@Module({
  controllers: [LoanController],
  providers: [LoanService],
  imports: [TypeOrmModule.forFeature([Loan]), UserModule, BookModule],
})
export class LoanModule {}
