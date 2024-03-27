import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { ReturnAuthorDto } from './dto/return-author.dto';
import { ReturnDeleteResultDto } from '../dtos/return-delete-result.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  async findAll(): Promise<ReturnAuthorDto[]> {
    const authors = await this.authorService.findAll();
    return authors.map((author) => new ReturnAuthorDto(author));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnAuthorDto> {
    const author = await this.authorService.findById(id);

    return new ReturnAuthorDto(author);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ReturnDeleteResultDto> {
    return new ReturnDeleteResultDto(await this.authorService.remove(id));
  }
}
