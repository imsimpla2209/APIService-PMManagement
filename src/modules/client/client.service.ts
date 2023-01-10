/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCRUDService } from '../../shared/service/based-crud.service';
import { Repository } from 'typeorm';
import { generateUsername } from 'unique-username-generator';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dtos/create-client.dto';

@Injectable()
export class ClientService extends BaseCRUDService<Client>{
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository : Repository<Client>
    ){
        super(clientRepository, "client");
    }

    async getOneById(id: string) : Promise<Client | undefined> {
        try {
            let client = await this.clientRepository.query(`SELECT * FROM clients WHERE id = '${id}'`);
            return client;
        } catch (error) {
            throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.NOT_FOUND);
        }
    }

    async getAllProjectByClientId(projectId: string) : Promise<Client[] | undefined>{
        return await this.clientRepository.find({
            where: {
                projects: {
                    id: projectId,
                },
            },
            relations: ['projects'],
        });
    }

    async createFakeData(amount : number, authorId : string): Promise<boolean | undefined> {
        try {
            for (let index = 0; index < amount; index++) {
                // With maximum length constraint and no separator, no random digits
                let firstName = generateUsername("", 0, 9);
                let lastName = generateUsername("", 0, 9);
                let code = generateUsername("-", 2, 7).toUpperCase();
                let address = generateUsername("-", 2, 20);
                let email = firstName + "." + lastName + "@ncc.euro";
                let phone = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
                let client: CreateClientDto = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    code: code,
                    address: address,
                    phone: phone,
                    authorId: authorId,
                }
                await this.clientRepository.save(client);
                
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
