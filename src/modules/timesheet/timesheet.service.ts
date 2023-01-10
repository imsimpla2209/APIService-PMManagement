/* eslint-disable prettier/prettier */
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTimesheetDto } from './dtos/create-timesheet.dto';
import { Timesheet } from './entities/timesheet.entity';
import { Between, Repository } from 'typeorm';
import {startOfWeek, endOfWeek } from 'date-fns';
import { ApproveTimesheetDto } from './dtos/approve-timesheet.dto';
import { TimesheetStatus } from '../../common/enums/common.enum';
import { BaseCRUDService } from '../../shared/service/based-crud.service';

@Injectable()
export class TimesheetService extends BaseCRUDService<Timesheet> {
    constructor(
        @InjectRepository(Timesheet)
        private readonly timesheetRepo: Repository<Timesheet>,

        // @Inject(forwardRef(() => UserService))
        // private userService: UserService,
    ) { 
        super(timesheetRepo, "timesheet")
    }


    async getMyTimesheetByDay(create_at: string, author_id: string) {
        const timesheet = await this.timesheetRepo.find({
            where: {
                ownerid: author_id,
            },
        });
        return timesheet;
    }

    async getMyTimesheetByWeek(author_id: string) {
        const today = new Date();
        const timesheets = await this.timesheetRepo.find({
            where: {
                ownerid: author_id,
                create_at: Between(
                    startOfWeek(today, { weekStartsOn: 1 }),
                    endOfWeek(today, { weekStartsOn: 1 }),
                ),
            },
        });
        return timesheets;
    }

    async getAllMyTimesheet(authorId: string) {
        const timesheets = await this.timesheetRepo.createQueryBuilder()
                                    .leftJoinAndSelect('timesheet.projectId', 'projects')
                                    .leftJoinAndSelect('timesheet.taskId', 'tasks')
                                    .where(`timesheet.ownerid = ${authorId}`)
                                    .getMany();
        return timesheets;
    }

    async getAllTimesheetWithPendingStatus() {
        const timesheets = await this.timesheetRepo.find({
            where: {
                status: TimesheetStatus.Pending,
            },
        });
        return timesheets;
    }

    getByProject(proId: string) {
        return this.timesheetRepo.find({
            where: {
                projectId: proId,
            },
        });
    }

    getByPeople(authorId: string) {
        return this.timesheetRepo.find({
            where: {
                ownerid: authorId,
            },
        });
    }

    async submitTimesheetByWeek(authorId: string) {
        const today = new Date();
        const timesheetStatusNews = await this.timesheetRepo.find({
            where: {
                ownerid: authorId,
                create_at: Between(
                    startOfWeek(today, { weekStartsOn: 1 }),
                    endOfWeek(today, { weekStartsOn: 1 }),
                ),
                status: TimesheetStatus.Pending,
            },
        });

        const timesheetStatusPendings = await Promise.all(
            timesheetStatusNews.map((timesheet) =>
                this.preloadStatusMyTimesheet(TimesheetStatus.Pending, timesheet.id),
            ),
        );
        return timesheetStatusPendings;
    }

    async approveTimesheetByWeek(body: ApproveTimesheetDto) {
        const { projectId, authorId } = body;
        const today = new Date();
        const timesheetStatusPendings = await this.timesheetRepo.find({
            where: {
                create_at: Between(
                    startOfWeek(today, { weekStartsOn: 1 }),
                    endOfWeek(today, { weekStartsOn: 1 }),
                ),
                status: TimesheetStatus.Pending,
                ownerid: authorId,
                projectId,
            },
        });

        const timesheetStatusApproves = await Promise.all(
            timesheetStatusPendings.map((timesheet) =>
                this.preloadStatusMyTimesheet(TimesheetStatus.Approved, timesheet.id),
            ),
        );
        return timesheetStatusApproves;
    }

    async preloadStatusMyTimesheet(status: TimesheetStatus, id: string) {
        const timesheet = await this.timesheetRepo.preload({
            id,
            status,
        });
        return await this.timesheetRepo.save(timesheet);
    }
}
