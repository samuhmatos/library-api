import { ReturnDeleteResultDto } from '../dtos/return-delete-result.dto';
import { DeleteResult } from 'typeorm';

export const deleteResultMock: DeleteResult = {
  raw: '',
  affected: 1,
};

export const returnDeleteResultMock: ReturnDeleteResultDto = {
  message: 'Data deleted successfully',
};
