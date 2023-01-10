/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { Client } from "../../../modules/client/entities/client.entity";
import { Task } from "../../../modules/task/entities/task.entity";
import { User } from "../../../modules/user/entities/user.entity";


export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    projectCode: string;

    @IsString()
    @IsNotEmpty()
    projectType: string;

    // @IsObject()
    // @IsOptional()
    // client: Client;
    
    @IsArray()
    @IsOptional()
    tasks: Task[]

    @IsArray()
    @IsOptional()
    users: User[]

}
