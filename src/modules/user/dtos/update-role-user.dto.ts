/* eslint-disable prettier/prettier */

import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserUserDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['Staff', 'Intern', 'Admin', 'HR'])
    jobTitle: string;
}
