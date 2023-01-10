/* eslint-disable prettier/prettier */
// import Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RouterModule } from 'nest-router';
import config from './configs/type-orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { LocalFileModule } from './modules/local-file/local-file.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { TimesheetModule } from './modules/timesheet/timesheet.module';
import { UserRoleProjectModule } from './modules/user-role-project/user-role-project.module';
import { UserModule } from './modules/user/user.module';
// import { routes } from './route';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.development.env.stage.${process.env.STAGE}`],
    }),
    // RouterModule.forRoutes(routes),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: config
    }),
    UserModule,
    TaskModule,
    AuthModule,
    ClientModule,
    ProjectModule,
    TimesheetModule,
    LocalFileModule,
    UserRoleProjectModule,
  ],
  providers: [
      
  ]
  
})
export class AppModule { }
