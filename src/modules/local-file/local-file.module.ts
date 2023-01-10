/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import LocalFilesService from '../local-file/local-file.service';
import LocalFilesController from '../local-file/local-files.controller';
import LocalFile from './entities/local-file.entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([LocalFile]),
        AuthModule
    ],
    controllers: [LocalFilesController],
    providers: [
        LocalFilesService
    ],
    exports: [
        LocalFilesService
    ]
})
export class LocalFileModule { }
