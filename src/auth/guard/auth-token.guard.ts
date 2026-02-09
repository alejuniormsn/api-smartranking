import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import jwtConfig from "../config/jwt.config";
import * as config from "@nestjs/config";
import { JwtPayload } from "../interfaces/jwtPayload";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers?.authorization;
    if (!authHeader || typeof authHeader !== "string") {
      throw new UnauthorizedException("No token provided");
    }

    try {
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException("No token provided");
      }

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtConfiguration.secret,
      });
      request["user"] = { id: payload.sub, role: payload.role };
      return true;
    } catch (error: any) {
      throw new BadRequestException(`Token error: ${(error as Error).message}`);
    }
  }
}
