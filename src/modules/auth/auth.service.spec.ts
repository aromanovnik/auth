import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User, UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { GenderEnum, LoginModel } from '../../core';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return a LoginModel when provided with valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const user: User = {
        email: 'test@example.com',
        password: 'password',
        salt: '',
        firstName: '',
        lastName: '',
        description: '',
        gende: GenderEnum.Other,
      };
      const token = 'generatedToken';

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'generateToken').mockReturnValue(token);

      const result = await authService.login(loginDto);

      expect(result).toBeInstanceOf(LoginModel);
      expect(result.token).toEqual(token);
    });

    it('should throw UnauthorizedException when provided with invalid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const user: User = null;

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      try {
        await authService.login(loginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
