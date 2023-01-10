/* eslint-disable prettier/prettier */
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WorkingType } from '../../../common/enums/common.enum';

export class CreateTimesheetDto {
    @IsString()
    @IsNotEmpty()
    note: string;

    @IsNumber()
    @IsNotEmpty()
    workingTime: number;

    @IsIn([WorkingType['Normal'], WorkingType['Overtime']])
    @IsNotEmpty()
    type: WorkingType;

    @IsString()
    @IsNotEmpty()
    projectId: string;

    @IsString()
    @IsNotEmpty()
    taskId: string;
}
