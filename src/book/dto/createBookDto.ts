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

  @IsString()
  @IsNotEmpty()
  genreId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  stock: number;
}
