import { IsString, IsNotEmpty, IsPositive, IsNumber } from 'class-validator';

export class UpdateBorrowDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id_borrow: number;
}
