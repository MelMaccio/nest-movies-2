import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            dialect: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            models: [User],
            autoLoadModels: true,
            synchronize: true,
          }),
        }),
      ],
})
export class DatabaseModule { }
