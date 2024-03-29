import { ReturnUserDto } from '../../user/dto';

export interface ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
