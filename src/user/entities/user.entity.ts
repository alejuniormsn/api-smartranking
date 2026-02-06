import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
  AllowNull,
} from "sequelize-typescript";

@Table({ tableName: "users" })
export class UserEntity extends Model {
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
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare nome: string;

  @AllowNull(false)
  @Column("VARCHAR(100)")
  declare password: string;
}
