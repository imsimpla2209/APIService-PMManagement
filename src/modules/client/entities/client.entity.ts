/* eslint-disable prettier/prettier */
import { IsNotEmpty ,IsPhoneNumber, MaxLength} from "class-validator";
import { Project } from "../../../modules/project/entities/project.entity";
import { User } from "../../../modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'nvarchar', default: ''})
    firstName: string;    

    @Column({type: 'nvarchar', default: ''})
    lastName: string;

    @Column({type: 'nvarchar', unique: true})
    @IsNotEmpty()
    email: string;

    @Column({type: 'text', default: ''})
    code: string;

    @Column({type: 'varchar', default: ''})
    @IsPhoneNumber()
    @MaxLength(10)
    phone: string;

    @Column({type: 'nvarchar', default: ''})
    address: string;
    
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'varchar', default: ''})
    authorId: string;

    @OneToMany(()=> Project, (project)=> project.client, {
        eager: false
    })
    projects: Project[];

    
}

