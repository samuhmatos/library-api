import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CollectionRepository, CollectionService } from '../collection.service';
import { Collection } from '../entities/collection.entity';
import { collectionMock } from '../__mocks__/collection.mock';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { updateCollectionMock } from '../__mocks__/update-collection.mock';
import { createCollectionMock } from '../__mocks__/create-collection.mock';

describe('CollectionService', () => {
  let service: CollectionService;
  let collectionRepository: CollectionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionService,
        {
          provide: getRepositoryToken(Collection),
          useValue: {
            save: jest.fn().mockResolvedValue(collectionMock),
            find: jest.fn().mockResolvedValue([collectionMock]),
            findOne: jest.fn().mockResolvedValue(collectionMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
    collectionRepository = module.get<CollectionRepository>(
      getRepositoryToken(Collection),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(collectionRepository).toBeDefined();
  });

  it('should return DeleteResult on remove', async () => {
    const collection = await service.remove(collectionMock.id);
    expect(collection).toEqual(deleteResultMock);
  });

  it('should return 404 if collection is not found on remove', async () => {
    jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.remove(collectionMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return collection on update', async () => {
    jest.spyOn(service, 'findByName').mockResolvedValue(undefined);

    const collection = await service.update(
      collectionMock.id,
      updateCollectionMock,
    );

    expect(collection).toEqual(collectionMock);
  });

  it('should return error 404 if collection id is not found on update', async () => {
    jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.update(collectionMock.id, updateCollectionMock),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return error badRequest if collection name already exists on update', async () => {
    expect(
      service.update(collectionMock.id, updateCollectionMock),
    ).rejects.toThrow(BadRequestException);
  });

  it('should return collection on findByName', async () => {
    const collection = await service.findByName(collectionMock.name);

    expect(collection).toEqual(collectionMock);
  });

  it('should return error 404 if user name is not found on findByName', async () => {
    jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findByName(collectionMock.name)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return collection on findById', async () => {
    const collection = await service.findById(collectionMock.id);

    expect(collection).toEqual(collectionMock);
  });

  it('should return error 404 if user id is not found on findById', async () => {
    jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(collectionMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return collection list on findAll', async () => {
    const collections = await service.findAll();

    expect(collections).toEqual([collectionMock]);
  });

  it('should return collection on create', async () => {
    jest.spyOn(collectionRepository, 'findOne').mockResolvedValue(undefined);

    const collection = await service.create(createCollectionMock);

    expect(collection).toEqual(collectionMock);
  });

  it('should return error BadRequest if already exist collection name on create', async () => {
    expect(service.create(createCollectionMock)).rejects.toThrow(
      BadRequestException,
    );
  });
});
