import { ReturnUserDto } from '../../user/dto';
import { userMock } from '../../user/__mocks__/user.mock';
import { ReturnLoginDto } from '../dto/return-login.dto';
import { JwtMock } from './jwt.mock';

export const returnLoginMock: ReturnLoginDto = {
  user: new ReturnUserDto(userMock),
  accessToken: JwtMock,
};
