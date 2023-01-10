/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskType } from '../../../common/enums/common.enum';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    authorId: string;

    @IsEnum(TaskType)
    @IsOptional()
    type: TaskType;
}
