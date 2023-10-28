import { ApiProperty } from '@nestjs/swagger';

export class LoginModel {
  @ApiProperty()
  token: string;

  constructor(token) {
    this.token = token;
  }
}
