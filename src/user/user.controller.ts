import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ReturnUserDto } from './dto';
import { ReturnDeleteResultDto } from '../dtos/return-delete-result.dto';
import { UserType } from './enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';

@Roles(UserType.Admin)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.userService.findAll();

    return users.map((user) => new ReturnUserDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnUserDto> {
    const user = await this.userService.findById(id);

    return new ReturnUserDto(user);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ReturnDeleteResultDto> {
    return new ReturnDeleteResultDto(await this.userService.remove(id));
  }
}
