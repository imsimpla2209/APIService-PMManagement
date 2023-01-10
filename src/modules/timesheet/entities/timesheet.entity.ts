/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { TimesheetStatus, WorkingType } from "../../../common/enums/common.enum";
import { Project } from "../../../modules/project/entities/project.entity";
import { Task } from "../../../modules/task/entities/task.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('timesheets')
export class Timesheet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'nvarchar', nullable: false })
    @IsNotEmpty()
    name: string;

    @Column({ type: 'text', default: '' })
    note: string;

    @Column({ type: 'nvarchar', default: '' })
    type: string;

    @Column({ type: 'enum', default: TimesheetStatus.Pending, enum: TimesheetStatus })
    status: TimesheetStatus;

    @Column({ type: 'int' })
    workingTime: number;

    @Column({ type: 'enum', default: WorkingType["Normal"], enum: WorkingType })
    workingType: WorkingType;

    @Column()
    ownerid: string;

    @Column({ nullable: false })
    projectId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date;

    @Column({ nullable: false })
    taskId: string;
}

