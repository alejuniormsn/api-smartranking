import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Param,
  Post,
  Put,
  Query,
  Version,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { IUser } from "./interfaces/user.interface";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationDto } from "src/common/pagination/pagination.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthTokenGuard)
  @Get()
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Get()
  @Version("3")
  async findAllV3(@Query() paginationDto: PaginationDto): Promise<IUser[]> {
    return this.userService.findAllV3(paginationDto);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<IUser> {
    return this.userService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<IUser> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<object> {
    return this.userService.remove(id);
  }
}
