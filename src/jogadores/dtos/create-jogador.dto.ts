import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  IsUrl,
} from "class-validator";

export class CreateJogadorDto {
  @IsNotEmpty()
  @MinLength(11)
  cpf: string;

  @IsNotEmpty()
  @MinLength(5)
  nome: string;

  @IsNotEmpty()
  @MinLength(11)
  telefone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  @IsOptional()
  urlFotoJogador: string;
}
