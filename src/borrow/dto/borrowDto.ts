import { IsNumber, IsNotEmpty, IsString, IsPositive } from 'class-validator';

export class BorrowDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  bookId: string;

  @IsString()
  from_date: Date;

  @IsString()
  to_date: Date;

  @IsString()
  @IsNotEmpty()
  state: string;
}
