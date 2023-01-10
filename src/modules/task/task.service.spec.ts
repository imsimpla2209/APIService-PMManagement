/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/entities/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController Unit Tests', () => {
  let taskController: TaskController;
  let spyService: TaskService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: TaskService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        getAll: jest.fn(() => {}),
        getAllByProjectId: jest.fn(() => []),
        findOneById: jest.fn(() => {}),
        getByOneOption: jest.fn(() => {}),
        update: jest.fn(() => {}),
        delete: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, APIServiceProvider],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
    spyService = app.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateTaskDto();
    const user = new User();
    expect(taskController.create(dto, user)).not.toEqual(null);
  });

  it('calling findAllByProjectId method', async () => {
    const proId: string = 'something';
    const tasks = await taskController.findAllByProjectId(proId);
    expect(tasks.length).toBe(0);
  });

  it('calling findAllByProjectId method', () => {
    expect(spyService.getAllByProjectId).toHaveBeenCalled();
  });

  it('calling findAllByProjectId method', () => {
    const proId: string = 'something';
    expect(spyService.getAllByProjectId).toHaveBeenCalled();
    expect(spyService.getAllByProjectId).toHaveBeenCalledWith(proId);
  });

  it('calling findAllByProjectId method', () => {
    const proId: string = 'something';
    expect(taskController.findAllByProjectId(proId)).toEqual([]);
  });

  it('calling findAllByProjectId method', async () => {
    const proId: string = 'c06d29aa-f86c-4ef6-a998-3fd8bcd7b179';
    expect(taskController.findAllByProjectId(proId)).not.toEqual(null);
  });
  

  it('calling findOne method', () => {
    const taskId: string = 'something';
    expect(taskController.findAllByProjectId(taskId)).toEqual([]);
  });

  it('calling findOne method', () => {
    const taskId: string = '01e40d5b-df94-48d7-87ed-be2c954ffe2b';
    expect(taskController.findAllByProjectId(taskId)).not.toEqual(null);
  });

  it('calling findOne method', () => {
    const taskId: string = 'something';
    expect(spyService.getAllByProjectId).toHaveBeenCalled();
    expect(spyService.getAllByProjectId).toHaveBeenCalledWith(taskId);
  });

  it('calling update method', () => {
    const taskId: string = 'something';
    const dto: CreateTaskDto = new CreateTaskDto();
    expect(taskController.update(taskId, dto)).not.toEqual(null);
  });

  it('calling update method', () => {
    const dto: CreateTaskDto = new CreateTaskDto();
    const taskId: string = 'something';
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(taskId, dto);
  });
});
