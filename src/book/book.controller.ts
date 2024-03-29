import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ReturnBookDto } from './dto/return-book.dto';
import { ReturnDeleteResultDto } from '../dtos/return-delete-result.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<ReturnBookDto[]> {
    const books = await this.bookService.findAll();

    return books.map((book) => new ReturnBookDto(book));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnBookDto> {
    const book = await this.bookService.findById(id);
    return new ReturnBookDto(book);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ReturnDeleteResultDto> {
    const deleteResult = await this.bookService.remove(id);
    return new ReturnDeleteResultDto(deleteResult);
  }
}
