import { User } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
  }
}
