import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
  AllowNull,
  Default,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({ tableName: "jogadores" })
export class JogadorEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column("VARCHAR(15)")
  declare cpf: string;

  @Unique
  @AllowNull(false)
  @Column("VARCHAR(15)")
  declare telefone: string;

  @Unique
  @AllowNull(false)
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare nome: string;

  @AllowNull(true)
  @Column
  declare urlFotoJogador: string;

  @Default(0)
  @Column
  declare vitorias: number;

  @Default(0)
  @Column
  declare derrotas: number;

  @Default(0)
  @Column
  declare empates: number;

  @Default(0)
  @Column
  declare pontos: number;

  @Default(false)
  @Column
  declare lider: boolean;

  @CreatedAt
  @Column
  declare createdAt: Date;

  @UpdatedAt
  @Column
  declare updatedAt: Date;
}
