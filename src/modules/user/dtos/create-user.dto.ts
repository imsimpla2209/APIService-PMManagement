/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Level, TaskType, UserType } from '../../../common/enums/common.enum';
import { Branch } from '../../../common/enums/common.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(60)
    @Matches(/^[a-z ,.'-]+$/i)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(60)
    @Matches(/^[a-z ,.'-]+$/i)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsPhoneNumber()
    @MaxLength(11)
    @MinLength(10)
    phone: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "Password is too weak"})
    password: string;

    @IsEnum(UserType)
    @IsOptional()
    jobTitle: UserType;
    
    @IsEnum(Level)
    @IsOptional()
    rank: Level;
    
    @IsEnum(Branch)
    @IsOptional()
    branch: Branch;
    
    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @IsNotEmpty()
    dob: Date;

    @IsNotEmpty()
    @Max(1)
    @Min(0)
    sex: number;


    @IsBoolean()
    @IsOptional()
    isPm: boolean;
}
