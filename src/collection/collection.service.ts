import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';

export type CollectionRepository = Repository<Collection>;

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const collection = await this.findByName(createCollectionDto.name).catch(
      () => undefined,
    );

    if (collection) {
      throw new BadRequestException(
        `Collection name ${createCollectionDto.name} already exists`,
      );
    }

    return this.collectionRepository.save({
      ...createCollectionDto,
    });
  }

  async findAll(): Promise<Collection[]> {
    return this.collectionRepository.find();
  }

  async findById(id: number): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      where: { id },
      relations: {
        books: true,
      },
    });

    if (!collection) {
      throw new NotFoundException(`Collection id ${id} not found`);
    }

    return collection;
  }

  async findByName(name: string): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      where: { name },
    });

    if (!collection) {
      throw new NotFoundException(`Collection name ${name} not found`);
    }

    return collection;
  }

  async update(
    id: number,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    const collection = await this.findById(id);

    if (updateCollectionDto.name) {
      const existCollection = await this.findByName(
        updateCollectionDto.name,
      ).catch(() => undefined);

      if (existCollection) {
        throw new BadRequestException(
          `Collection name ${updateCollectionDto.name} already exists`,
        );
      }
    }

    return this.collectionRepository.save({
      ...collection,
      ...updateCollectionDto,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.collectionRepository.delete({ id });
  }
}
