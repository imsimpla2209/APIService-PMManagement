/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Branch, Level, UserType } from '../../common/enums/common.enum';
import { generateUsername } from 'unique-username-generator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
// import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserUserDto } from './dtos/update-role-user.dto';
import { not } from '@hapi/joi';

describe('UserController&Service Unit Tests', () => {
  let spyService: UserService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        create: jest.fn(() => { }),
        createUser: jest.fn(() => { }),
        getAll: jest.fn(() => { }),
        getByOneOption: jest.fn(() => { }),
        update: jest.fn(() => { }),
        updateUser: jest.fn(() => { }),
        updateUserRole: jest.fn(() => { }),
        delete: jest.fn(() => { }),
        createFakeData: jest.fn(() => { }),
        getOneById: jest.fn(() => { }),
        getByEmail: jest.fn(() => { }),
        getAllProjectByUserId: jest.fn(() => []),
        getAllByProjectId: jest.fn(() => []),
        deActiveUser: jest.fn(() => { }),
        reActiveUser: jest.fn(() => { }),
        resetPassword: jest.fn(() => { })
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [UserService, APIServiceProvider],
    }).compile();

    spyService = app.get<UserService>(UserService);
  });



  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateUserDto();
    const userId = "c06d29aa-f86c-4ef6-a998-3fd8bcd7b17"
    expect(spyService.create(dto, userId)).not.toEqual(null);
  });

  it('calling getAll method', async () => {
    const Users = await spyService.getAll();
    expect(Users).not.toBe(null);
  });

  it('calling getAll method', () => {
    expect(spyService.getAll).toHaveBeenCalled();
  });

  it('calling getAllProjectByUserId method', async () => {
    const Users = await spyService.getAllProjectByUserId("015f96f7-1cda-46b4-973d-d33624860c4e");
    expect(Users).not.toBe(null);
  });

  it('calling getAllByProjectId method', () => {
    expect(spyService.getAllProjectByUserId).toHaveBeenCalled();
  });

  it('calling getAllByProjectId method', async () => {
    const Users = await spyService.getAllProjectByUserId("015f96f7-1cda-46b4-973d-d33624860c4e");
    expect(Users).not.toBe(null);
  });

  it('calling getAllProjectByUserId method', () => {
    expect(spyService.getAllProjectByUserId).toHaveBeenCalled();
  });

  it('calling getOne method', () => {
    const userId = 'Dcmtestdcchua';
    expect(spyService.getByOneOption(userId)).toBeUndefined();
  });

  it('calling getOne method', () => {
    const userId = '645f38ee-f296-4dc1-a3c1-9d1beee5bdaa';
    expect(spyService.getOneById(userId)).not.toBe(null);
  });

  it('calling getByEmail method', () => {
    const userMail = 'Dcmtestdcchua@sadasd';
    expect(spyService.getByOneOption(userMail)).toBeUndefined();
  });

  it('calling getByEmail method', () => {
    const userMail = 'ironyslee.archivebe@ncc.euro';
    expect(spyService.getOneById(userMail)).not.toBe(null);
  });

  it('calling createUser method', async () => {
    let firstName = generateUsername("", 0, 9);
    let lastName = generateUsername("", 0, 9);
    let password = 'vcllllll';
    let hashPass = await bcrypt.hash(password, 10);
    let code = generateUsername("-", 2, 7).toUpperCase();
    let address = generateUsername("-", 2, 20);
    let bio = generateUsername("", 2, 100);
    let salary = 1000000 * Math.floor(Math.random() * 40);
    let email = firstName + "." + lastName + "@ncc.euro";
    let dob = new Date(1985, 0, 1);

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
      sex: 1,
      code: code,
      address: address,
      phone: phone,
      bio: bio,
      branch: branch,
      jobTitle: randJobValue,
      rank: rank,
      isPm: false
    }

    expect(spyService.create(user, "skrt")).toBe(undefined);
    // expect(spyService.createUser).toHaveBeenCalledWith(dto, acc);
  });

  it('calling updateUser method', () => {
    const UserId = 'something';
    const dto: CreateUserDto = new CreateUserDto();
    expect(spyService.updateUser(UserId, dto)).not.toEqual(null);
  });

  it('calling updateUserRole method', () => {
    const UserId = 'something';
    const dto: UpdateUserUserDto = new UpdateUserUserDto();
    expect(spyService.updateUserRole(UserId, dto)).not.toEqual(null);
  });



  it('calling deActiveUser method', () => {
    const UserId = "015f96f7-1cda-46b4-973d-d33624860c4e";
    expect(spyService.deActiveUser(UserId)).not.toEqual(null);
  });

  it('calling deActiveUser method', () => {
    const UserId = "015f96f7-1cda-46b4-973d-d33624860c4e";
    expect(spyService.deActiveUser).toHaveBeenCalled();
    expect(spyService.deActiveUser).toHaveBeenCalledWith(UserId);
  });

  it('calling reActiveUser method', () => {
    const UserId = "015f96f7-1cda-46b4-973d-d33624860c4e";
    expect(spyService.reActiveUser(UserId)).not.toEqual(null);
  });

  it('calling reActiveUser method', () => {
    const UserId = "015f96f7-1cda-46b4-973d-d33624860c4e";
    expect(spyService.reActiveUser).toHaveBeenCalled();
    expect(spyService.reActiveUser).toHaveBeenCalledWith(UserId);
  });

  it('calling resetPassword method', () => {
    const UserId = "015f96f7-1cda-46b4-973d-d33624860c4e";
    const newPass = 'nhudb'
    expect(spyService.resetPassword(UserId, newPass)).not.toEqual(null);
  });

  it('calling resetPassword method', () => {
    const UserId = "015f96f7-1cda-46b4-973d-d33624860c4e";
    const newPass = 'nhudb'
    expect(spyService.resetPassword).toHaveBeenCalled();
    expect(spyService.resetPassword).toHaveBeenCalledWith(UserId, newPass);
  });
});
