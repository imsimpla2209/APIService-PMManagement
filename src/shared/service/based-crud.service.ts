/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { PageOptionsDto } from '../../common/pagination/page-option.dto';
import { PageMetaDto } from '../../common/pagination/page-meta.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PageDto } from '../../common/pagination/page.dto';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult, Repository } from 'typeorm';
import { Order } from '../../common/enums/common.enum';

export class BaseCRUDService<T>
{
    protected readonly repository: Repository<T>;
    private readonly entityName: string;
    

    constructor(repository: Repository<T>, entityName: string) {
        this.repository = repository;
        this.entityName = entityName;
    }

    async getAll(pageOptionsDto?: PageOptionsDto): Promise<PageDto<T> | undefined> {
        try {
            let results;
            if (!pageOptionsDto) {
                results = await this.repository.createQueryBuilder()
                    .orderBy(`${this.entityName}.createdAt`)
                    .skip(0)
                    .take(10);
            }
            else {
                let order = Object.values(Order)[pageOptionsDto.order]
                results = await this.repository.createQueryBuilder()
                    .orderBy(`${this.entityName}.createdAt`, order)
                    .skip(pageOptionsDto.skip)
                    .take(pageOptionsDto.take);
            }

            const itemCount = await results.getCount();
            const { entities } = await results.getRawAndEntities();
            const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new HttpException(`Some thing went wrong: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    async getByOneOption(option): Promise<T | undefined> {
        try {
            const result = await this.repository.findOne({
                select: option.select,
                where: option.where,
            });
            return result;
        } catch (error) {
            throw new HttpException(`Some thing went wrong: ${error.message}`, HttpStatus.NOT_FOUND);
        }
    }

    async create(data: any, authorId: string): Promise<boolean | undefined> {
        try {
            const savedData = await this.repository.save({
                ...data,
                authorId
            });
            if (savedData) return true;
        } catch (error) {
            throw new HttpException(`Some thing went wrong: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, data: any): Promise<boolean | undefined> {
        try {
            await this.repository.update(id, data);
            return true;
        } catch (error) {
            throw new HttpException(`Some thing went wrong: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: EntityId): Promise<DeleteResult> {
        try {
            return await this.repository.delete(id);
        } catch (error) {
            throw new HttpException(`Some thing went wrong: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }
}