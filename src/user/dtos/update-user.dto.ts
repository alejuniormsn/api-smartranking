import { IsEmail, IsOptional, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  nome: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(8)
  password: string;
}
