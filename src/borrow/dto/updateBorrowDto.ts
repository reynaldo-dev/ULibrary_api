import { IsString, IsNotEmpty, IsPositive, IsNumber } from 'class-validator';

export class UpdateBorrowDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}
