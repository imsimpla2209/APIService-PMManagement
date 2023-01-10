/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Order } from "../enums/common.enum";

export class PageOptionsDto {
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(1)
    @IsOptional()
    readonly order?: number = 0;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly take?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}