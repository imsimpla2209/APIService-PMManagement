/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { TaskService } from '../task/task.service';
import { ClientService } from '../client/Client.service';
import { PageOptionsDto } from '../../common/pagination/page-option.dto';
import { PageDto } from '../../common/pagination/page.dto';
import { Order } from '../../common/enums/common.enum';
import { PageMetaDto } from '../../common/pagination/page-meta.dto';
import { BaseCRUDService } from '../../shared/service/based-crud.service';
import { UserService } from '../user/user.service';
// import { Task } from '../task/entities/task.entity';
import { CreateProjectDto } from './dto/create-project.dto';
// import { UserJoinProjectService } from '../user-join-project/user-join-project.service';

@Injectable()
export class ProjectService extends BaseCRUDService<Project> {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,

        @Inject(forwardRef(() => TaskService))
        private taskService: TaskService,

        @Inject(forwardRef(() => UserService))
        private userService: UserService,

        @Inject(forwardRef(() => ClientService))
        private ClientService: ClientService,

    ) { super(projectRepository, "project") }

    async createProject(data: CreateProjectDto, authorId: string, clientId: string)
    : Promise<CreateProjectDto | undefined> {
        try {
            let client = await this.ClientService.getOneById(clientId);
            let project = new Project({
                ...data,
                client,
                authorId
            })
            let createdProject = await this.projectRepository.save(project);
            return createdProject;
        } catch (error) {
            throw new HttpException(`Some thing went wrong: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    async addClientToProject( clientId: string, id: string)
    : Promise<Project | undefined> {
        try {
            let Client = await this.ClientService.getOneById(clientId);
            let project = await this.projectRepository.findOne({ where: { id: id } });
            if (!project) {
                throw new Error(`Project with ID: ${id} not found`);
            }
            project.client = Client;
            let savedProject = await this.projectRepository.save(project);
            return savedProject;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    async addUserToProject(userIds: string[], id: string)
    : Promise<boolean | undefined> {
        try {
            for(let i = 0; i < userIds.length; i++) {
                await this.projectRepository.query(
                    `INSERT INTO projects_users_users( projectsId, usersId) VALUES ('0c838461-9339-4dc1-b64b-b64ac0fb76fc', '48247432-08c9-4f43-8920-1733dfb1d778')`
                )
            }return true;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }
    // async addUserToProject(userIds: string[], id: string)
    // : Promise<Project | undefined> {
    //     try {
    //         let taskList = []
    //         for(let i = 0; i < userIds.length; i++) {
    //             let user = await this.userService.getOneById(userIds[i]);
    //             taskList.push(user);
    //         }
    //         let project = await this.projectRepository.findOne({ where: { id: id } });
    //         if (!project) {
    //             throw new Error(`Project with ID: ${id} not found`);
    //         }
    //         (project.users) ? project.users = taskList : project.users = taskList;
    //         await this.projectRepository.save(project);
    //         return project;
    //     } catch (error) {
    //         throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
    //     }
    // }

    async getAllDetailProject(pageOptionsDto: PageOptionsDto): Promise<PageDto<Project> | undefined> {
        try {
            let order = Object.values(Order)[pageOptionsDto.order]
            let results = await this.projectRepository.createQueryBuilder()
                .orderBy(`project.createdAt`, order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.take)
                .leftJoinAndSelect('project.client', 'clients')
                .leftJoinAndSelect('project.tasks', 'tasks')

            const itemCount = await results.getCount();
            const { entities } = await results.getRawAndEntities();
            const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new HttpException(`Some thing went wrong: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }


    async getByProjectId(id: string): Promise<Project | undefined> {
        try {
            let project = await this.projectRepository.createQueryBuilder('projects')
                                .where(`projects.id = '${id}'`)
                                .leftJoinAndSelect('projects.client', 'clients')
                                .getOne()
            if (!project) {
                throw new Error(`Project with ID: ${id} not found`);
            }
            return project;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    

    async getByClientId(ClientId: string): Promise<Project[] | undefined> {
        let client = await this.ClientService.getOneById(ClientId)
        let project = await this.projectRepository.find({
            where: {
                client: client,
            },
            relations: ['Client', 'tasks'],
        });
        if (!project) {
            throw new NotFoundException(
                `Project with Client ID: ${ClientId} not found`,
            );
        }
        return project;
    }
}
