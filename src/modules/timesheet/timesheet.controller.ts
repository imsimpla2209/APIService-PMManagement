/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserType } from '../../common/enums/common.enum';
import RolesGuard from '../auth/roles.guard';
import { User } from '../user/entities/user.entity';
import { ApproveTimesheetDto } from './dtos/approve-timesheet.dto';
import { CreateTimesheetDto } from './dtos/create-timesheet.dto';
import { TimesheetService } from './timesheet.service';

@Controller('timesheet')
@UseGuards(AuthGuard())
export class TimesheetController {
    constructor(private readonly timesheetService: TimesheetService) { }
    // _______________________________Read_________________________________________

    @Get('list-my-timesheets')
    getAllMyTimesheet(@GetUser() user: User) {
        return this.timesheetService.getAllMyTimesheet(user.id);
    }

    @Get('timesheet-by-pending-status')
    getAllTimesheetWithPendingStatus() {
        return this.timesheetService.getAllTimesheetWithPendingStatus();
    }

    @Get('timesheet-by-day/:day')
    getMyTimesheetByDay(
        @Param() create_at: { day: string },
        @GetUser() user: User,
    ) {
        return this.timesheetService.getMyTimesheetByDay(create_at.day, user.id);
    }

    @Get('timesheet-by-week')
    getMyTimesheetByWeek(@GetUser() user: User) {
        return this.timesheetService.getMyTimesheetByWeek(user.id);
    }

    @Get('timesheet-by-project/:projectId')
    getAllTimesheetByProject(@Param('projectId') proId: string) {
        return this.timesheetService.findByProject(proId);
    }

    @Get('timesheet-by-people/:creatorId')
    getAllTimesheetByPeople(@Param('creatorId') peopleId: string) {
        return this.timesheetService.findByPeople(peopleId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.timesheetService.findOne(id);
    }

    // __________________________________Create____________________________________________
    @Post('create-new-timesheet')
    create(
        @Body() createTimesheetDto: CreateTimesheetDto,
        @GetUser() user: User,
    ) {
        return this.timesheetService.create(createTimesheetDto, user.id);
    }

    @Post('submit-timesheet-by-week')
    async approveTimesheetsByWeek(@GetUser() user: User) {
        const timesheets = await this.timesheetService.submitTimesheetByWeek(
            user.id,
        );
        return timesheets;
    }

    @UseGuards(RolesGuard(UserType.Staff || UserType.Admin))    
    @Post('approval-timesheet-by-week')
    async submitMyTimesheetByWeek(@Body() body: ApproveTimesheetDto) {
        const timesheets = await this.timesheetService.approveTimesheetByWeek(body);
        return timesheets;
    }

    // __________________________________Update____________________________________________
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTimesheetDto,
    ) {
        return this.timesheetService.update(id, updateTimesheetDto);
    }

    // ___________________________________Delete___________________________________________
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.timesheetService.remove(id);
    }
}
