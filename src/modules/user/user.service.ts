/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { generateUsername } from "unique-username-generator";
import { BaseCRUDService } from '../../shared/service/based-crud.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserUserDto } from './dtos/update-role-user.dto';
import { Branch, Level, UserType } from '../../common/enums/common.enum';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import LocalFilesService from "../local-file/local-file.service";

@Injectable()
export class UserService extends BaseCRUDService<User> {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        private localFilesService: LocalFilesService
    ) {
        super(UserRepository, "user")
    }


    getAllByProjectId(projectId: string): Promise<User[] | undefined> {
        return this.UserRepository.find({
            where: {
                projects: {
                    id: projectId,
                },
            },
            relations: ['project'],
        });
    }

    getAllProjectByUserId(id: string): Promise<User[] | undefined> {
        return this.UserRepository.find({
            where: {
                id: id
            },
            relations: {
                projects: true
            }
        });
    }


    async getOneById(id: string): Promise<User | undefined> {
        try {
            let user = await this.UserRepository
                .query(`SELECT * FROM users WHERE id = '${id}'`);
            return user;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.NOT_FOUND);
        }
    }


    async getByEmail(email: string): Promise<User | undefined> {
        try {
            let user = await this.UserRepository
                .query(`SELECT * FROM users WHERE email = '${email}'`)
            return user;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.NOT_FOUND);

        }
    }

    async getByName(name: string): Promise<User[] | undefined> {
        try {
            let users = await this.UserRepository
                .query(`SELECT * FROM users WHERE concat(firstName, ' ',  lastName)  like '%${name}%'`)
            return users;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.NOT_FOUND);

        }
    }

    async createUser(createUserDto: CreateUserDto, authorId: string): Promise<CreateUserDto | undefined> {
        try {
            let isExsistEmail = await this.getByEmail(createUserDto.email);
            if (isExsistEmail) {
                throw new Error(`${createUserDto.email} already exists`);
            }
            else {
                let hash = await bcrypt.hash(createUserDto.password, 10);
                createUserDto[`password`] = hash;
                await this.create(createUserDto, authorId);
                return createUserDto;
            }
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    async updateUser(id: string, updateUserDto: CreateUserDto): Promise<CreateUserDto | undefined> {
        try {
            let isExsistEmail = await this.getByEmail(updateUserDto.email);
            if (isExsistEmail) {
                throw new Error(`${updateUserDto.email} already exists`);
            }
            else {
                let hash = await bcrypt.hash(updateUserDto.password, 10);
                updateUserDto[`password`] = hash;
                await this.update(id, updateUserDto);
                return updateUserDto;
            }
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    async updateUserRole(id: string, role: UpdateUserUserDto): Promise<boolean | undefined> {
        try {
            let jobTitle: UserType = UserType[`${role}`]
            await this.UserRepository.update({ id: id }, { jobTitle: jobTitle });
            return true;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    async addAvatar(userId: string, fileData: LocalFileDto) {
        const avatar = await this.localFilesService.saveLocalFileData(fileData);
        await this.UserRepository.update(userId, {
            avatarId: avatar.id
        })
        return avatar;
    }

    async resetPassword(id: string, password: string): Promise<boolean | undefined> {
        try {
            let hashPass = await bcrypt.hash(password, 10)
            await this.UserRepository.update({ id: id }, { password: hashPass });
            return true;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    async deActiveUser(id: string): Promise<boolean | undefined> {
        try {
            await this.UserRepository.update({ id: id }, { isActive: false });
            return true;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    async reActiveUser(id: string): Promise<boolean | undefined> {
        try {
            await this.UserRepository.update({ id: id }, { isActive: true });
            return true;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    async createFakeData(amount: number): Promise<boolean | undefined> {
        try {
            for (let index = 0; index < amount; index++) {
                // With maximum length constraint and no separator, no random digits
                let firstName = generateUsername("", 0, 9);
                let lastName = generateUsername("", 0, 9);
                let password = 'vcllllll';
                let hashPass = await bcrypt.hash(password, 10);
                let code = generateUsername("-", 2, 7).toUpperCase();
                let address = generateUsername("-", 2, 20);
                let bio = generateUsername("", 2, 100);
                let salary = 1000000 * Math.floor(Math.random() * 40);
                let email = firstName + "." + lastName + "@ncc.euro";
                let dob = this.randomDate(new Date(1985, 0, 1), new Date());

                let rand = Math.floor(Math.random() * Object.keys(Branch).length);
                let branch: Branch = Branch[Object.values(Branch)[rand]];
                console.log(rand, branch)
                let jobRand = Math.floor(Math.random() * Object.keys(UserType).length);
                let randJobValue = UserType[Object.values(UserType)[jobRand]];

                let rankRand = Math.floor(Math.random() * Object.keys(Level).length);
                let rank: Level = Level[Object.values(Level)[rankRand]];
                console.log(rankRand, rank)
                let phone = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
                let user: CreateUserDto = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashPass,
                    salary: salary,
                    dob: dob,
                    sex: (index % 2),
                    code: code,
                    address: address,
                    phone: phone,
                    bio: bio,
                    branch: branch,
                    jobTitle: randJobValue,
                    rank: rank,
                    isPm: (index % 2) ? false : true
                }
                await this.UserRepository.save(user);

            }
            return true;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
        }
    }

    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

}
