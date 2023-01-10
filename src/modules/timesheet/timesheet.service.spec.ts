/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTimesheetDto } from './dtos/create-timesheet.dto';
import { TimesheetService } from './timesheet.service';
// import { User } from '../user/user.entity';

describe('TimeSheetController Unit Tests', () => {
  let spyService: TimesheetService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: TimesheetService,
      useFactory: () => ({
        create: jest.fn(() => { }),
        getAll: jest.fn(() => { }),
        getByOneOption: jest.fn(() => { }),
        update: jest.fn(() => { }),
        delete: jest.fn(() => { }),
        createFakeData: jest.fn(() => { }),
        getByTimeSheetId: jest.fn(() => { })
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      // controllers: [TimeSheetController],
      providers: [TimesheetService, APIServiceProvider],
    }).compile();

    // TimeSheetController = app.get<TimeSheetController>(TimeSheetController);
    spyService = app.get<TimesheetService>(TimesheetService);
  });

  // it('should be defined', () => {
  //     expect(TimeSheetController).toBeDefined();
  // });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateTimesheetDto();
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
    const TimeSheetServiceId = 'Dcmtestdcchua';
    expect(spyService.getByOneOption(TimeSheetServiceId)).toBeUndefined();
  });

  it('calling getOne method', () => {
    const TimeSheetServiceId = '645f38ee-f296-4dc1-a3c1-9d1beee5bdaa';
    expect(spyService.getByOneOption(TimeSheetServiceId)).not.toBe(null);
  });

  it('calling update method', () => {
    const taskId = 'something';
    const dto: CreateTimesheetDto = new CreateTimesheetDto();
    expect(spyService.update(taskId, dto)).not.toEqual(null);
  });

  it('calling updateUser method', () => {
    const taskId = 'something';
    const dto: CreateTimesheetDto = new CreateTimesheetDto();
    expect(spyService.update(taskId, dto)).not.toEqual(null);
  });

  it('calling update method', () => {
    const dto: CreateTimesheetDto = new CreateTimesheetDto();
    const TimeSheetServiceId = 'something';
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(TimeSheetServiceId, dto);
  });
});
