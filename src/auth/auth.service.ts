import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { ReturnLoginDto } from './dto/return-login.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { password } from '../utils/password';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { ReturnUserDto } from '../user/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user: User | undefined = await this.userService
      .findByEmail(loginDto.email)
      .catch(() => undefined);

    const passwordMatch = await password.validate(
      loginDto.password,
      user?.password || '',
    );

    if (!user || !passwordMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
