import { DeleteResult } from 'typeorm/driver/mongodb/typings';

export const deleteResultMock: DeleteResult = {
  deletedCount: 1,
  acknowledged: true,
};
