import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsUrl,
  MinLength,
} from "class-validator";

export class UpdateJogadorDto {
  @IsOptional()
  @MinLength(3)
  nome: string;

  @IsOptional()
  @MinLength(11)
  telefone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  urlFotoJogador: string;

  @IsOptional()
  @IsNumber()
  vitorias: number;

  @IsOptional()
  @IsNumber()
  derrotas: number;

  @IsOptional()
  @IsNumber()
  empates: number;

  @IsOptional()
  @IsNumber()
  pontos: number;

  @IsOptional()
  @IsBoolean()
  lider: boolean;
}
