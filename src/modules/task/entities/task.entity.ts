/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { TaskType } from "../../../common/enums/common.enum";
import { Project } from "../../../modules/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('tasks')
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type: 'nvarchar', nullable: false})
    @IsNotEmpty()
    name: string;    
    
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'boolean', default: false})
    isDeleted: boolean;

    @Column({type: 'enum', default: TaskType["Common Task"], enum: TaskType})
    type: TaskType;

    @Column({type: 'varchar'})
    authorId: string;
    
    @ManyToMany(()=> Project, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    projects: Project[];

}

