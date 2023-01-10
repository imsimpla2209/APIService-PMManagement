/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ClientController } from './client.controller';
import { ClientService } from './Client.service';
import { Client } from './entities/client.entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Client]),
        AuthModule
    ],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService]
})

export class ClientModule { }
