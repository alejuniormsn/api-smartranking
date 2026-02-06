import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(11)
  cpf: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
