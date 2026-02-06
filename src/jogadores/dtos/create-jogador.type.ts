import { Optional } from "sequelize";
import { CreateJogadorDto } from "./create-jogador.dto";

export type CreateJogadorTypes = Optional<CreateJogadorDto, "urlFotoJogador">;
