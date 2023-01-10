/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CreateClientDto } from './dtos/create-client.dto';
import { ClientService } from './Client.service';
import { PageOptionsDto } from '../../common/pagination/page-option.dto';
import { PageDto } from '../../common/pagination/page.dto';
import { Client } from './entities/client.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';



@Controller('client')
@UseGuards(AuthGuard())
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
        private configService: ConfigService,
        ) {
        }

    // _______________________________Read_________________________________________
    @Get('get-all')
    async getAll(@Query() pageOptionsDto?: PageOptionsDto) : Promise<PageDto<Client> | undefined> {
        return await this.clientService.getAll(pageOptionsDto);
    }

    @Get('get-all-project-by-clientid/:id')
    getAllByProjectId(@Param('projectId') projectId: string) {
        return this.clientService.getAllProjectByClientId(projectId);
    }

    @Get('get-one-by-id/:id')
    getOne(@Param('id') id: string) {
        return this.clientService.getOneById(id);
    }

    @Get('get-one-by-option/:id')
    getOneByOption(@Param() option: any) {
        return this.clientService.getByOneOption(option);
    }

    @Get('create-fake-data')
    createFakeData(
        @Query('amount') amount: number,
        @GetUser() user: User
        ) {
        return this.clientService.createFakeData(amount, user.id);
    }
    

    // __________________________________Create____________________________________________
    @Post('create')
    create(@Body() createClientDto: CreateClientDto, authorId : string) {
        return this.clientService.create(createClientDto, authorId);
    }


    // __________________________________Update____________________________________________
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: CreateClientDto) {
        return this.clientService.update(id, updateClientDto);
    }

    // ___________________________________Delete___________________________________________
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientService.delete(id);
    }
}
