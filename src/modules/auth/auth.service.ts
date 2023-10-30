import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, ChangePasswordDto, RegistrationDto } from './dto';
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

  async registration(
    dto: RegistrationDto,
  ): Promise<LoginModel | HttpException> {
    const candidate = await this.userService.findOne({ email: dto.email });

    if (candidate) {
      throw new HttpException(ErrorMessages.EmailExists, HttpStatus.FORBIDDEN);
    }

    const saltLength = this.configService.get<string>('auth.saltLength') ?? '1';
    const salt = bcrypt.genSaltSync(parseInt(saltLength, 10));
    const hashPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.userService.create({
      email: dto.email,
      password: hashPassword,
      ...(dto.firstname && { firstName: dto.firstname }),
      ...(dto.lastname && { lastName: dto.lastname }),
      ...(dto.gender && { gender: dto.gender }),
    });

    if (user instanceof User) {
      return new LoginModel(this.generateToken(user));
    }

    throw new HttpException(
      ErrorMessages.InternalServerError,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
