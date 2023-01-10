/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
// import { User } from '../user/user.entity';

describe('ProjectController&Service Unit Tests', () => {
  let spyService: ProjectService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: ProjectService,
      useFactory: () => ({
        create: jest.fn(() => { }),
        getAll: jest.fn(() => { }),
        getByOneOption: jest.fn(() => { }),
        update: jest.fn(() => { }),
        delete: jest.fn(() => { }),
        createFakeData: jest.fn(() => { }),
        getByProjectId: jest.fn(() => { })
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      // controllers: [ProjectController],
      providers: [ProjectService, APIServiceProvider],
    }).compile();

    // ProjectController = app.get<ProjectController>(ProjectController);
    spyService = app.get<ProjectService>(ProjectService);
  });

  // it('should be defined', () => {
  //     expect(ProjectController).toBeDefined();
  // });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateProjectDto();
    const userId = "c06d29aa-f86c-4ef6-a998-3fd8bcd7b17"
    expect(spyService.create(dto, userId)).not.toEqual(null);
  });

  it('calling getAll method', async () => {
    const tasks = await spyService.getAll();
    expect(tasks).not.toBe(null);
  });

  it('calling getAll method', () => {
    expect(spyService.getAll).toHaveBeenCalled();
  });

  it('calling getOne method', () => {
    const ProjectServiceId = 'Dcmtestdcchua';
    expect(spyService.getByOneOption(ProjectServiceId)).toBeUndefined();
  });

  it('calling getOne method', () => {
    const ProjectServiceId = '645f38ee-f296-4dc1-a3c1-9d1beee5bdaa';
    expect(spyService.getByProjectId(ProjectServiceId)).not.toBe(null);
  });

  it('calling update method', () => {
    const taskId = 'something';
    const dto: UpdateProjectDto = new UpdateProjectDto();
    expect(spyService.update(taskId, dto)).not.toEqual(null);
  });

  it('calling updateUser method', () => {
    const taskId = 'something';
    const dto: UpdateProjectDto = new UpdateProjectDto();
    expect(spyService.update(taskId, dto)).not.toEqual(null);
  });

  it('calling update method', () => {
    const dto: UpdateProjectDto = new UpdateProjectDto();
    const ProjectServiceId = 'something';
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(ProjectServiceId, dto);
  });
});
