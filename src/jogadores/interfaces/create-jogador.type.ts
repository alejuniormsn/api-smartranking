import { Optional } from "sequelize";
import { IJogador } from "./jogador.interface";

export type CreateJogadorTypes = Optional<
  IJogador,
  | "id"
  | "urlFotoJogador"
  | "vitorias"
  | "derrotas"
  | "empates"
  | "pontos"
  | "lider"
  | "createdAt"
  | "updatedAt"
>;
