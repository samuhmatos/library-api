import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  resume: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  collection_id: number;

  @IsNumber()
  author_id: number;

  @IsNumber()
  publisher_id: number;

  @IsNumber()
  genre_id: number;
}
