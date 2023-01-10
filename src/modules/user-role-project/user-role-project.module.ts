/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleProject } from './entities/user-role-project.entity';
import { UserRoleProjectService } from './user-role-project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRoleProject])
    ],
    providers: [UserRoleProjectService],
    exports: [UserRoleProjectService]
})
export class UserRoleProjectModule { }
