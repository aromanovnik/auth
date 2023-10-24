import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from '../configuration';
import { MulterModule } from '@nestjs/platform-express';
import { User } from './modules/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      host: process.env.POSTGRES_HOST,
      entityPrefix: process.env.POSTGRES_PREFIX,
      dropSchema: JSON.parse(process.env.PRODUCTION),
      logger: 'simple-console',

      entities: [User],
      synchronize: !JSON.parse(process.env.PRODUCTION),
    }),
    MulterModule.register({
      dest: './files',
      limits: {
        files: 10,
        fileSize: 5e6, // 5mb
      },
    }),

    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
