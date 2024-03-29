import { User } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userMock: User = {
  id: 12,
  email: 'test@example.com',
  name: 'test',
  phone: '(35) 99234234',
  address: 'Rua teste',
  created_at: new Date(),
  password: '$2b$10$UQ/qZQ/jRwhymdekD6CuLe5DkXFXmgDsjAODXNyTR4pV46vO1/kjK',
  type_user: UserType.User,
};
