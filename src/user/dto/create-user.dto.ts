import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../enum/user-type.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserType)
  type_user?: UserType;
}
