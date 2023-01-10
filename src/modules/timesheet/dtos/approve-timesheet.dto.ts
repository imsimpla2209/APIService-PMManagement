/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class ApproveTimesheetDto {
    @IsString()
    @IsNotEmpty()
    authorId: string;

    @IsString()
    @IsNotEmpty()
    projectId: string;
}
