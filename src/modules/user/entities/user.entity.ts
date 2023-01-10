/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsPhoneNumber, Max, MaxLength, Min } from "class-validator";
import { Project } from "../../../modules/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branch, Level, UserType } from '../../../common/enums/common.enum';
import LocalFile from "../../local-file/entities/local-file.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'nvarchar', default: '' })
    firstName: string;

    @Column({ type: 'nvarchar', default: '' })
    lastName: string;

    @Column({ type: 'nvarchar', unique: true })
    @IsNotEmpty()
    email: string;

    @Column({ type: 'text', default: '' })
    bio: string;

    @Column({ type: 'varchar', default: '' })
    @IsPhoneNumber()
    @MaxLength(10)
    phone: string;

    @Column({ type: 'nvarchar', default: '' })
    address: string;

    @Column({ type: 'nvarchar' })
    password: string;

    @Column({ type: 'enum', default: UserType.Staff, enum: UserType })
    jobTitle: UserType;

    @Column({ type: 'enum', default: Level.Fresher, enum: Level })
    rank: Level;

    @Column({ type: 'int' })
    @IsNotEmpty()
    salary: number;

    @Column({ type: 'varchar' })
    @IsNotEmpty()
    code: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @Column({ type: 'date', nullable: false })
    dob: Date;

    @Column({ type: 'int', nullable: false })
    @Max(1)
    @Min(0)
    sex: number;

    @Column({ type: 'enum', default: Branch.Hanoi, enum: Branch })
    branch: Branch;

    @Column({ type: 'boolean', default: false })
    isAdmin?: boolean;

    @Column({ type: 'boolean', default: true, nullable: true })
    isActive?: boolean;

    @Column({ type: 'boolean', default: false })
    isPm?: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastLoginAt?: Date;

    @ManyToMany(() => Project, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    projects?: Project[];

    @JoinColumn({ name: 'avatarId' })
    @OneToOne(
        () => LocalFile,
        {
            nullable: true
        }
    )
    avatar?: LocalFile;

    @Column({ nullable: true })
    public avatarId?: string;
}

