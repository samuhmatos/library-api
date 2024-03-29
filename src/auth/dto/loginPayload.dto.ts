import { User } from '../../user/entities/user.entity';

export class LoginPayloadDto {
  id: number;
  type_user: number;

  constructor(user: User) {
    this.id = user.id;
    this.type_user = user.type_user;
  }
}
