export interface IJogadorV2 {
  readonly id?: number;
  readonly telefone: string;
  readonly email: string;
  readonly nome: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
