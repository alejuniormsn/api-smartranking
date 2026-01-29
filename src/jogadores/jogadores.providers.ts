import { JogadorEntity } from "./jogador.entity";

export const jogadoresProviders = [
  {
    provide: "JOGADOR_REPOSITORY",
    useValue: JogadorEntity,
  },
];
