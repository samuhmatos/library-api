import { Body, Controller, Post } from '@nestjs/common';
import { ReturnLoginDto } from './dto/return-login.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    return this.authService.login(loginDto);
  }
}
