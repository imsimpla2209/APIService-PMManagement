/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
// import LocalFilesService from '../local-file/local-file.service';
// import LocalFilesController from '../local-file/local-files.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LocalFileModule } from '../local-file/local-file.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    AuthModule,
    LocalFileModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}
