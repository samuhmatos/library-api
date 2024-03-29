import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';
import { ReturnCollectionDto } from './dto/return-collection.dto';
import { ReturnDeleteResultDto } from '../dtos/return-delete-result.dto';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';

@Roles(UserType.Admin)
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  async create(
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    return this.collectionService.create(createCollectionDto);
  }

  @Get()
  async findAll(): Promise<ReturnCollectionDto[]> {
    const collections = await this.collectionService.findAll();

    return collections.map((collection) => new ReturnCollectionDto(collection));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnCollectionDto> {
    const collection = await this.collectionService.findById(id);
    return new ReturnCollectionDto(collection);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ReturnDeleteResultDto> {
    const res = await this.collectionService.remove(id);
    return new ReturnDeleteResultDto(res);
  }
}
