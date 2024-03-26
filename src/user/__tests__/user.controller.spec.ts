import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from '../user.controller';
import { UserService } from '../user.service';

import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { createUserMock, updateUserMock, userMock } from '../__mocks__';
import { ReturnUserDto } from '../dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userMock),
            findAll: jest.fn().mockResolvedValue([userMock]),
            findById: jest.fn().mockResolvedValue(userMock),
            update: jest.fn().mockResolvedValue(userMock),
            remove: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user on create', async () => {
    const user = await controller.create(createUserMock);

    expect(user).toEqual(userMock);
  });

  it('should return user list on findAll', async () => {
    const users = await controller.findAll();

    expect(users).toEqual([new ReturnUserDto(userMock)]);
  });

  it('should return user on findOne', async () => {
    const user = await controller.findOne(userMock.id);

    expect(user).toEqual(new ReturnUserDto(userMock));
  });

  it('should return user on update', async () => {
    const user = await controller.update(userMock.id, updateUserMock);

    expect(user).toEqual(userMock);
  });

  it('should return user on remove', async () => {
    const user = await controller.remove(userMock.id);

    expect(user).toEqual(deleteResultMock);
  });
});
