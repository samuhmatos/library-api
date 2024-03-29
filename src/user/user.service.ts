import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { password } from '../utils/password';
import { UserType } from './enum/user-type.enum';

export type UserRepository = Repository<User>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validate(createUserDto.email, createUserDto.phone);

    const hashedPassword = await password.createHash(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      type_user: createUserDto.type_user || UserType.User,
      password: hashedPassword,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { loans: true },
    });

    if (!user) {
      throw new NotFoundException(`User Id: ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User email: ${email} not found`);
    }

    return user;
  }

  private async validate(email?: string, phone?: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (user) {
      throw new NotFoundException(`Phone or EMAIL already in use`);
    }

    return false;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    if (updateUserDto?.email || updateUserDto?.phone) {
      await this.validate(updateUserDto.email, updateUserDto.phone);
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.userRepository.delete({ id });
  }
}
