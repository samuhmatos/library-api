import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';

export type PublisherRepository = Repository<Publisher>;

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: PublisherRepository,
  ) {}

  async create(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    const existPublisherName = await this.findByName(
      createPublisherDto.name,
    ).catch(() => undefined);

    if (existPublisherName) {
      throw new BadRequestException(`Publisher name is already in use`);
    }

    return this.publisherRepository.save({ ...createPublisherDto });
  }

  async findAll(): Promise<Publisher[]> {
    return this.publisherRepository.find();
  }

  async findById(id: number): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({
      where: { id },
      relations: { books: true },
    });

    if (!publisher) {
      throw new NotFoundException(`Publisher id ${id} not found`);
    }

    return publisher;
  }

  async findByName(name: string): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({
      where: { name },
    });

    if (!publisher) {
      throw new NotFoundException(`Publisher name ${name} not found`);
    }

    return publisher;
  }

  async update(
    id: number,
    updatePublisherDto: UpdatePublisherDto,
  ): Promise<Publisher> {
    const publisher = await this.findById(id);

    if (updatePublisherDto?.name) {
      const existPublisherName = await this.findByName(
        updatePublisherDto.name,
      ).catch(() => undefined);

      if (existPublisherName) {
        throw new BadRequestException(`Publisher name is already in use`);
      }
    }

    return this.publisherRepository.save({
      ...publisher,
      ...updatePublisherDto,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.publisherRepository.delete({ id });
  }
}
