import { DeleteResult } from 'typeorm';

export class ReturnDeleteResultDto {
  message: string;

  constructor(deleteResult: DeleteResult) {
    if (deleteResult.affected > 0) {
      this.message = 'Data deleted successfully';
    } else {
      this.message = 'None data was deleted';
    }
  }
}
