import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PaginationDto } from "src/common/pagination/pagination.dto";
import { BadRequestException } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { IUser } from "./interfaces/user.interface";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { HashingService } from "src/auth/hash/hashing.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: typeof UserEntity,
    private readonly hashingService: HashingService
  ) {}

  async findAll(): Promise<IUser[]> {
    try {
      const users = await this.userRepository.findAll({
        attributes: { exclude: ["password"] },
      });
      if (!users || users.length === 0) {
        throw new NotFoundException(`Not found "users"`);
      }
      return users;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException((error as Error).message);
    }
  }

  async findAllV3(paginationDto?: PaginationDto): Promise<IUser[]> {
    try {
      const users = await this.userRepository.findAll({
        limit: paginationDto?.limit || 10,
        offset: paginationDto?.offset || 0,
        order: [["createdAt", paginationDto?.order || "ASC"]],
        attributes: { exclude: ["password"] },
      });
      if (!users || users.length === 0) {
        throw new NotFoundException(`Not found "users"`);
      }
      return users;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException((error as Error).message);
    }
  }

  async findOne(id: number): Promise<IUser> {
    try {
      const user = await this.userRepository.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw new NotFoundException(`Not found "user" with id ${id}`);
      }
      return user;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException((error as Error).message);
    }
  }

  async create(userDto: CreateUserDto): Promise<IUser> {
    try {
      const hashedPassword = this.hashingService.hash(userDto.password);
      const userWithoutPassword = await this.userRepository.create({
        ...userDto,
        password: hashedPassword,
      });
      const user: IUser = {
        ...userWithoutPassword.toJSON(),
        password: undefined,
      };
      return user;
    } catch (error: any) {
      throw new BadRequestException((error as Error).message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<IUser> {
    try {
      let hashedPassword = updateUserDto.password;
      if (updateUserDto.password) {
        hashedPassword = this.hashingService.hash(updateUserDto.password);
      }
      const [affectedCount, [updatedUser]] = await this.userRepository.update(
        {
          ...updateUserDto,
          password: hashedPassword,
        },
        {
          where: { id },
          returning: true,
        }
      );
      if (affectedCount === 0) {
        throw new NotFoundException(`Not found "user" with id ${id}`);
      }
      const user: IUser = {
        ...updatedUser.toJSON(),
        password: undefined,
      };
      return user;
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException((error as Error).message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const deletedCount = await this.userRepository.destroy({
        where: { id },
      });
      if (deletedCount === 0) {
        throw new NotFoundException(`Not found "user" with id ${id}`);
      }
      return {
        message: `Successfully removed "user" with id ${id}`,
        success: true,
        statusCode: HttpStatus.OK,
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException((error as Error).message);
    }
  }
}
