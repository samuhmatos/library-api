import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { UserRepository, UserService } from '../user.service';
import { User } from '../entities/user.entity';

import { userMock, createUserMock, updateUserMock } from '../__mocks__';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([userMock]),
            findOne: jest.fn().mockResolvedValue(userMock),
            save: jest.fn().mockResolvedValue(userMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user on create', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.create(createUserMock);

    expect(user).toEqual(userMock);
  });

  it('should return error 404 if user(email or phone) already exist on create', async () => {
    expect(service.create(createUserMock)).rejects.toThrow(NotFoundException);
  });

  it('should return user list on findAll', async () => {
    const users = await service.findAll();

    expect(users).toEqual([userMock]);
  });

  it('should return user on findById', async () => {
    const user = await service.findById(userMock.id);

    expect(user).toEqual(userMock);
  });

  it('should return error 404 if user id is not found on findById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(userMock.id)).rejects.toThrow(NotFoundException);
  });

  it('should return user on update', async () => {
    jest.spyOn(service, 'findById').mockResolvedValue(userMock);
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.update(userMock.id, updateUserMock);

    expect(user).toEqual(userMock);
  });

  it('should return error 404 if user id not found on update', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.update(userMock.id, updateUserMock)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return error 404 if user(email or phone) already exist on update', async () => {
    expect(service.update(userMock.id, updateUserMock)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return user on remove', async () => {
    const user = await service.remove(userMock.id);

    expect(user).toEqual(deleteResultMock);
  });

  it('should return error 404 if user is not found on remove', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.remove(userMock.id)).rejects.toThrow(NotFoundException);
  });
});
