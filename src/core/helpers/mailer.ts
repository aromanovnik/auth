import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class Mailer {
  transporter: any;

  constructor(private configService: ConfigService) {
    this.init().then();
  }

  async init(): Promise<void> {
    this.transporter = nodemailer.createTransport({
      // host: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get<string>('email.user'),
        pass: this.configService.get<string>('email.pass'),
      },
    });
  }

  async sendMail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<void> {
    // send mail with defined transport object
    // let info = await transporter.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: 'bar@example.com, baz@example.com', // list of receivers
    //   subject: 'Hello ✔', // Subject line
    //   text: 'Hello world?', // plain text body
    //   html: '<b>Hello world?</b>', // html body
    // });
    if (!this.transporter) {
      return;
    }

    await this.transporter.sendMail({
      from: this.configService.get<string>('email.user'),
      to,
      subject,
      text,
      html,
    });
  }
}
