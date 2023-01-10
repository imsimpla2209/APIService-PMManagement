/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { Client } from "../../../modules/client/entities/client.entity";
import { Task } from "../../../modules/task/entities/task.entity";
import { Timesheet } from "../../../modules/timesheet/entities/timesheet.entity";
import { User } from "../../../modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('projects')
export class Project{
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type: 'nvarchar', nullable: false})
    @IsNotEmpty()
    name: string;

    @Column({type: 'text', default: ''})
    note?: string;
    
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt?: Date;

    @UpdateDateColumn ({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastModified?: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    timeStart?: Date;

    @Column({type: 'nvarchar', nullable: false})
    projectType: string;

    @Column({type: 'varchar', nullable: false})
    projectCode: string;

    @Column({type: 'varchar'})
    authorId: string;

    @Column({type: 'varchar', nullable: true})
    komuChannelId?: string;

    // Relation
    @ManyToOne(()=> Client, (client) => client.projects, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        eager: true
    })
    client: Client;
    
    @ManyToMany(()=> User, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    users: User[];

    @ManyToMany(()=> Task, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    tasks: Task[];
    

    constructor(project?: Partial<Project>) {
        Object.assign(this, project)
    }
    
    // @OneToMany(() => Timesheet, (timesheet) => timesheet.project)
    // timesheets: Timesheet[];
}

