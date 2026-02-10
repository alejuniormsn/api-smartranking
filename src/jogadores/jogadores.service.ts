import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateJogadorDto } from "./dtos/update-jogador.dto";
import { CreateJogadorTypes } from "./dtos/create-jogador.type";
import { IJogador } from "./interfaces/jogador.interface";
import { IJogadorV2 } from "./interfaces/jogador-v2.interface";
import { JogadorEntity } from "./entities/jogador.entity";
import { PaginationDto } from "../common/pagination/pagination.dto";
import { handleDatabaseError } from "src/common/error/handleDatabaseError";

@Injectable()
export class JogadoresService {
  constructor(
    @Inject("JOGADOR_REPOSITORY")
    private jogadorRepository: typeof JogadorEntity
  ) {}

  async findAll(): Promise<IJogador[]> {
    try {
      const jogadores = await this.jogadorRepository.findAll();
      if (!jogadores || jogadores.length === 0) {
        throw new NotFoundException(`Not found "jogadores"`);
      }
      return jogadores;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async findAllV2(): Promise<IJogadorV2[]> {
    try {
      const jogadores = await this.jogadorRepository.findAll();
      if (!jogadores || jogadores.length === 0) {
        throw new NotFoundException(`Not found "jogadores"`);
      }
      return jogadores.map((jogador) => this.toJogadorDtoV2(jogador));
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async findAllV3(paginationDto?: PaginationDto): Promise<IJogador[]> {
    try {
      const jogadores = await this.jogadorRepository.findAll({
        limit: paginationDto?.limit || 10,
        offset: paginationDto?.offset || 0,
        order: [["createdAt", paginationDto?.order || "ASC"]],
      });
      if (!jogadores || jogadores.length === 0) {
        throw new NotFoundException(`Not found "jogadores"`);
      }
      return jogadores;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async findOne(id: number): Promise<IJogador> {
    try {
      const jogador = await this.jogadorRepository.findByPk(id);
      if (!jogador) {
        throw new NotFoundException(`Not found "jogador" with id ${id}`);
      }
      return jogador;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async findOneV2(id: number): Promise<IJogadorV2> {
    try {
      const jogador = await this.jogadorRepository.findByPk(id);
      if (!jogador) {
        throw new NotFoundException(`Not found "jogador" with id ${id}`);
      }
      return this.toJogadorDtoV2(jogador);
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async create(jogadorDto: CreateJogadorTypes): Promise<IJogador> {
    try {
      return await this.jogadorRepository.create(jogadorDto);
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async update(
    id: number,
    updateJogadorDto: UpdateJogadorDto
  ): Promise<IJogador> {
    try {
      const [affectedCount, [updatedJogador]] =
        await this.jogadorRepository.update(updateJogadorDto, {
          where: { id },
          returning: true,
        });
      if (affectedCount === 0) {
        throw new NotFoundException(`Not found "jogador" with id ${id}`);
      }
      return updatedJogador;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const deletedCount = await this.jogadorRepository.destroy({
        where: { id },
      });
      if (deletedCount === 0) {
        throw new NotFoundException(`Not found "jogador" with id ${id}`);
      }
      return {
        message: `Successfully removed "jogador" with id ${id}`,
        status: HttpStatus.OK,
      };
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  private toJogadorDtoV2(jogador: IJogador): IJogadorV2 {
    return {
      id: jogador.id,
      nome: jogador.nome,
      telefone: jogador.telefone,
      email: jogador.email,
      createdAt: jogador.createdAt,
      updatedAt: jogador.updatedAt,
    };
  }
}
