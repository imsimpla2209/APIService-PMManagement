/* eslint-disable prettier/prettier */
import { ProjectMemberRole } from "src/common/enums/common.enum";
import { Project } from "src/modules/project/entities/project.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_role_project')
export class UserRoleProject {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Project, (project) => project.id, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        nullable: false
    })
    @JoinColumn({referencedColumnName: 'id'})
    project: Project

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        nullable: false
    })
    @JoinColumn({referencedColumnName: 'id'})
    user: User

    @Column({type: 'enum', default: 'Member', enum: ProjectMemberRole})
    projectMemberRole: string

}