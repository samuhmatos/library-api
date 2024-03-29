import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';
import { ReturnPublisherDto } from './dto/return-publisher.dto';
import { ReturnDeleteResultDto } from '../dtos/return-delete-result.dto';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';

@Roles(UserType.Admin)
@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  async create(
    @Body() createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  async findAll(): Promise<ReturnPublisherDto[]> {
    const publishers = await this.publisherService.findAll();
    return publishers.map((publisher) => new ReturnPublisherDto(publisher));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnPublisherDto> {
    const publisher = await this.publisherService.findById(id);
    return new ReturnPublisherDto(publisher);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ): Promise<Publisher> {
    return this.publisherService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ReturnDeleteResultDto> {
    const deleteResult = await this.publisherService.remove(id);
    return new ReturnDeleteResultDto(deleteResult);
  }
}
