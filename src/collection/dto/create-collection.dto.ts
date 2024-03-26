import { IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;
}
