import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        };
      },
    }),
  ],
})
export class AuthModule {}
