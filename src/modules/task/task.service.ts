/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCRUDService } from '../../shared/service/based-crud.service';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService extends BaseCRUDService<Task> {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository?: Repository<Task>,
    ) {
        super(taskRepository, "task")
    }

    getAllByProjectId(projectId: string) : Promise<Task[] | undefined>{
        return this.taskRepository.find({
            where: {
                projects: {
                    id: projectId,
                },
            },
            relations: ['project'],
        });
    }

    async findOneById(id: string) : Promise<Task | undefined> {
        try {
            let task = await this.taskRepository.query(`SELECT * FROM tasks WHERE id = '${id}'`);
            return task;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.NOT_FOUND);
        }
    }

}
