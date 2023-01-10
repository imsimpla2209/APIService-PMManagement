/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Project } from './entities/project.entity';
import { PageDto } from '../../common/pagination/page.dto';
import { PageOptionsDto } from '../../common/pagination/page-option.dto';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    // _______________________________Read_________________________________________
    @Get('get-all')
    async getAll(@Query() pageOptionsDto?: PageOptionsDto): Promise<PageDto<Project> | undefined>{
        return await this.projectService.getAllDetailProject(pageOptionsDto);
    }

    @Get(':id')
    async getByProjectId(@Param('id') id: string): Promise<Project | undefined>{
        return await this.projectService.getByProjectId(id);
    }

    @Get('filter-by-Client-id/:ClientId')
    async getByClientId(@Param('ClientId') ClientId: string): Promise<Project[] | undefined>{
        return await this.projectService.getByClientId(ClientId);
    }

    // __________________________________Create____________________________________________
    @Post('create')
    async create(
        @Body() body: CreateProjectDto, 
        @GetUser() user: User, 
        @Query('clientId') clientId: string) {
        return await this.projectService.createProject(body, user.id, clientId);
    }

    // __________________________________Update____________________________________________
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return await this.projectService.update(id, updateProjectDto);
    }

    // ___________________________________Delete___________________________________________
    @Patch('add-Client-to-project/:id')
    AddClientToProject(
        @Body('clientId') clientId: string,
        @Param('id') id: string,

    ) {
        return this.projectService.addClientToProject(clientId, id);
    }

    // @Patch('add-tasks-to-project/:id')
    // AddTasksToProject(
    //     @Body('taskId') taskId: string[],
    //     @Param('id') id: string,
    // ) {
    //     console.log(taskId);
    //     return this.projectService.addTasksToProject(taskId, id);
    // }

    @Patch('add-user-to-project/:id')
    AddTasksToProject(
        @Body('userId') userIds: string[],
        @Param('id') id: string,
    ) {
        console.log(userIds);
        return this.projectService.addUserToProject(userIds, id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectService.delete(id);
    }
}
