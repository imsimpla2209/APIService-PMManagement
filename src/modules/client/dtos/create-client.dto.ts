/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateClientDto {
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
    authorId: string;
}
