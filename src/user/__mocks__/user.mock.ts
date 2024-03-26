import { User } from '../entities/user.entity';

export const userMock: User = {
  id: 12,
  email: 'test@example.com',
  name: 'test',
  phone: '(35) 99234234',
  address: 'Rua teste',
  created_at: new Date(),
};
