import { IsNumber, IsNotEmpty, IsString, IsPositive } from 'class-validator';

export class BorrowDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id_user: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id_book: number;

  @IsString()
  @IsNotEmpty()
  from_date: Date;

  @IsString()
  @IsNotEmpty()
  to_date: Date;

  @IsString()
  @IsNotEmpty()
  state: string;
}
