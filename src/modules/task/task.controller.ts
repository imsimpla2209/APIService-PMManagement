/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { PageOptionsDto } from '../../common/pagination/page-option.dto';
import { PageDto } from '../../common/pagination/page.dto';
import { User } from '../user/entities/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';



@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(private readonly taskService?: TaskService) { }

    // _______________________________Read_________________________________________
    @Get('get-all')
    async getAll(@Query() pageOptionsDto?: PageOptionsDto) : Promise<PageDto<Task> | undefined> {
        return await this.taskService.getAll(pageOptionsDto);
    }
    
    @Get('get-all-by-projectId/:projectId')
    findAllByProjectId(@Param('projectId') projectId: string) {
        return this.taskService.getAllByProjectId(projectId);
    }

    @Get('get-one-by-id/:id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOneById(id);
    }
    
    @Get('get-one-by-option/:id')
    findOneByOption(@Param() option: any) {
        return this.taskService.getByOneOption(option);
    }

    // __________________________________Create____________________________________________
    @Post('create')
    create(
        @Body() createTaskDto: CreateTaskDto, 
        @GetUser() user : User
        ) {
        return this.taskService.create(createTaskDto, user.id);
    }
    
    // __________________________________Update____________________________________________
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    // ___________________________________Delete___________________________________________
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.delete(id);
    }
}
