import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Version,
} from "@nestjs/common";
import { CreateJogadorDto } from "./dtos/create-jogador.dto";
import { IJogador } from "./interfaces/jogador.interface";
import { JogadoresService } from "./jogadores.service";
import { UpdateJogadorDto } from "./dtos/update-jogador.dto";
import { IJogadorV2 } from "./interfaces/jogador-v2.interface";
import { Query } from "@nestjs/common";
import { PaginationDto } from "../common/pagination/pagination.dto";

@Controller("jogadores")
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get() // v1
  findAll(): Promise<IJogador[]> {
    return this.jogadoresService.findAll();
  }

  @Version("2")
  @Get() // v2
  findAllV2(): Promise<IJogadorV2[]> {
    return this.jogadoresService.findAllV2();
  }

  @Version("3")
  @Get() // v3
  findAllV3(@Query() paginationDto: PaginationDto): Promise<IJogador[]> {
    return this.jogadoresService.findAllV3(paginationDto);
  }

  @Get(":id") // v1
  findOne(@Param("id", ParseIntPipe) id: number): Promise<IJogador> {
    return this.jogadoresService.findOne(id);
  }

  @Version("2")
  @Get(":id") // v2
  findOneV2(@Param("id", ParseIntPipe) id: number): Promise<IJogadorV2> {
    return this.jogadoresService.findOneV2(id);
  }

  @Post() // v1
  @UsePipes(new ValidationPipe())
  create(@Body() jogadorDto: CreateJogadorDto): Promise<IJogador> {
    return this.jogadoresService.create(jogadorDto);
  }

  @Put(":id")
  update(
    @Body() updateJogadorDto: UpdateJogadorDto,
    @Param("id", ParseIntPipe) id: number
  ): Promise<IJogador> {
    return this.jogadoresService.update(id, updateJogadorDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number): Promise<object> {
    return this.jogadoresService.remove(id);
  }
}
