import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from '../loan.controller';
import { LoanService } from '../loan.service';
import { loanMock } from '../__mocks__/loan.mock';
import { createLoanMock } from '../__mocks__/create-loan.mock';
import { ReturnLoanDto } from '../dto/return-loan.dto';

describe('LoanController', () => {
  let controller: LoanController;
  let loanService: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [
        {
          provide: LoanService,
          useValue: {
            create: jest.fn().mockResolvedValue(loanMock),
            findAll: jest.fn().mockResolvedValue([loanMock]),
            findById: jest.fn().mockResolvedValue(loanMock),
            finish: jest.fn().mockResolvedValue(loanMock),
          },
        },
      ],
    }).compile();

    controller = module.get<LoanController>(LoanController);
    loanService = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(loanService).toBeDefined();
  });

  it('should return loan on create', async () => {
    const loan = await controller.create(createLoanMock);

    expect(loan).toEqual(loanMock);
  });

  it('should return loan on findAll', async () => {
    const loans = await controller.findAll();

    expect(loans).toEqual([new ReturnLoanDto(loanMock)]);
  });

  it('should return loan on findById', async () => {
    const loan = await controller.findById(loanMock.id);

    expect(loan).toEqual(new ReturnLoanDto(loanMock));
  });

  it('should return loan on finish', async () => {
    const loan = await controller.finish(loanMock.id);

    expect(loan).toEqual(loanMock);
  });
});
