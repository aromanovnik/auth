import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginModel } from '../../core';
import { LoginDto, RegistrationDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: 200, type: LoginModel })
  @ApiResponse({ status: 403 })
  @HttpCode(200)
  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiOkResponse({ status: 201, type: LoginModel })
  @ApiResponse({ status: 403 })
  @ApiResponse({ status: 500 })
  @HttpCode(201)
  @Post('/registration')
  registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }
}
