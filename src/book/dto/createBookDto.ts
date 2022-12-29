import { IsNumber, IsPositive, IsNotEmpty, IsString } from 'class-validator';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  published: Date;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  id_genre: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  stock: number;
}
