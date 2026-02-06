import { Module } from "@nestjs/common";
import { JogadoresController } from "./jogadores.controller";
import { JogadoresService } from "./jogadores.service";
import { DatabaseModule } from "../database/database.module";
import { jogadoresProviders } from "./entities/jogadores.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [JogadoresController],
  providers: [JogadoresService, ...jogadoresProviders],
})
export class JogadoresModule {}
