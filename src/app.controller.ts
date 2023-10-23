import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/robots.txt')
  robot(@Res() res): string {
    const text = this.appService.getRobot();
    res.type('text/plain');
    return res.send(text);
  }
}
