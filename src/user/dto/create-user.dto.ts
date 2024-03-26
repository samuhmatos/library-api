import { IsEmail, IsOptional, IsString } from 'class-validator';

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
}
