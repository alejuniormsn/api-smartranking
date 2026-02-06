export interface IUser {
  readonly id?: number;
  readonly cpf: string;
  readonly email: string;
  readonly nome: string;
  readonly password?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
