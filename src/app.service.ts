import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getRobot(): string {
    return 'User-agent: *\nDisallow: /';
  }
}
