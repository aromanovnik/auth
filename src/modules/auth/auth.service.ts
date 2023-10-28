import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, ChangePasswordDto } from './dto';
import { ErrorMessages, LoginModel } from '../../core';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async validateUser(
    dto: LoginDto | ChangePasswordDto,
  ): Promise<User | HttpException> {
    const user = await this.userService.findOne({
      email: dto.email,
    });

    if (!user) {
      throw new HttpException(
        ErrorMessages.IncorrectEmailOrPassword,
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (!passwordEquals) {
      throw new HttpException(
        ErrorMessages.IncorrectEmailOrPassword,
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }

  private generateToken(user: User): string {
    //role: user.role
    return this.jwtService.sign(
      { id: user.id, salt: user.salt },
      {
        expiresIn: '365d',
      },
    );
  }

  async login(dto: LoginDto): Promise<LoginModel | UnauthorizedException> {
    const user = await this.validateUser(dto);
    if (user instanceof User) {
      return new LoginModel(this.generateToken(user));
    }

    return user;
  }
}
