/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ClientModule } from '../client/client.module';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';
import { AuthModule } from '../auth/auth.module';
// import { UserJoinProjectModule } from '../user-join-project/user-join-project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    ClientModule,
    UserModule,
    TaskModule,
    AuthModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule { }
