import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class PostUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  id_role: number;
}
