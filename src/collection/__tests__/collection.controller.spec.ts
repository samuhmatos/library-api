import { Test, TestingModule } from '@nestjs/testing';
import { CollectionController } from '../collection.controller';
import { CollectionService } from '../collection.service';
import { collectionMock } from '../__mocks__/collection.mock';
import {
  deleteResultMock,
  returnDeleteResultMock,
} from '../../__mocks__/delete-result.mock';
import { createCollectionMock } from '../__mocks__/create-collection.mock';
import { ReturnCollectionDto } from '../dto/return-collection.dto';
import { updateCollectionMock } from '../__mocks__/update-collection.mock';

describe('CollectionController', () => {
  let controller: CollectionController;
  let collectionService: CollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionController],
      providers: [
        {
          provide: CollectionService,
          useValue: {
            create: jest.fn().mockResolvedValue(collectionMock),
            findAll: jest.fn().mockResolvedValue([collectionMock]),
            findById: jest.fn().mockResolvedValue(collectionMock),
            update: jest.fn().mockResolvedValue(collectionMock),
            remove: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    controller = module.get<CollectionController>(CollectionController);
    collectionService = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(collectionService).toBeDefined();
  });

  it('should return collection on create', async () => {
    const collection = await controller.create(createCollectionMock);
    expect(collection).toEqual(collectionMock);
  });

  it('should return collection list on findAll', async () => {
    const collections = await controller.findAll();
    expect(collections).toEqual([new ReturnCollectionDto(collectionMock)]);
  });

  it('should return collection on findOne', async () => {
    const collection = await controller.findOne(collectionMock.id);

    expect(collection).toEqual(new ReturnCollectionDto(collectionMock));
  });

  it('should return collection on update', async () => {
    const collection = await controller.update(
      collectionMock.id,
      updateCollectionMock,
    );

    expect(collection).toEqual(collectionMock);
  });

  it('should return deleteResult on remove', async () => {
    const response = await controller.remove(collectionMock.id);

    expect(response).toEqual(returnDeleteResultMock);
  });
});
