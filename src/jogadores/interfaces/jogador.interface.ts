export interface IJogador {
  readonly id?: number;
  readonly cpf: string;
  readonly telefone: string;
  readonly email: string;
  readonly nome: string;
  readonly urlFotoJogador?: string;
  readonly vitorias?: number;
  readonly derrotas?: number;
  readonly empates?: number;
  readonly pontos?: number;
  readonly lider?: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
