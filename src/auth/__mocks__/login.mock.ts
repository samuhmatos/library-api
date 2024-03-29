import { userMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dto/login.dto';

export const loginMock: LoginDto = {
  email: userMock.email,
  password: 'password',
};
