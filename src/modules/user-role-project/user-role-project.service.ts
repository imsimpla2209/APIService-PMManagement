/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleProject } from './entities/user-role-project.entity';

@Injectable()
export class UserRoleProjectService {
    constructor(
        @InjectRepository(UserRoleProject)
        private readonly URPRepository: Repository<UserRoleProject>
    ) { }

    async addUserToProject(projectMemberRole: string, projectId: string, userId: string): Promise<boolean | undefined> {
        try {
            await this.URPRepository.save({
                projectMemberRole,
                projectId,
                userId
            })
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }

    // async deleteUserFromProject(projectsId: string, usersId: string): Promise<any> {
    //     return await this.URPRepository.delete({
    //         projectsId,
    //         usersId
    //     })
    // }
}
