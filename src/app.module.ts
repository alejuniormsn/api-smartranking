import { Module } from "@nestjs/common";
import { JogadoresModule } from "./jogadores/jogadores.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [DatabaseModule, JogadoresModule],
})
export class AppModule {}
