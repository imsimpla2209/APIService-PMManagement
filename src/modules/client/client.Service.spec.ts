/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos/create-client.dto';
// import { User } from '../user/user.entity';

describe('ClientController Unit Tests', () => {
    let spyService: ClientService;

    beforeAll(async () => {
        const APIServiceProvider = {
            provide: ClientService,
            useFactory: () => ({
                create: jest.fn(() => { }),
                getAll: jest.fn(() => {}),
                getByOneOption: jest.fn(() => { }),
                update: jest.fn(() => { }),
                delete: jest.fn(() => { }),
                createFakeData: jest.fn(() => { }),
                getOneById: jest.fn(() => { })
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            // controllers: [ClientController],
            providers: [ClientService, APIServiceProvider],
        }).compile();

        // clientController = app.get<ClientController>(ClientController);
        spyService = app.get<ClientService>(ClientService);
    });

    // it('should be defined', () => {
    //     expect(clientController).toBeDefined();
    // });

    it('should be defined', () => {
        expect(spyService).toBeDefined();
    });

    it('calling create method', () => {
        const dto = new CreateClientDto();
        const userId = "c06d29aa-f86c-4ef6-a998-3fd8bcd7b17"
        expect(spyService.create(dto, userId)).not.toEqual(null);
    });

    it('calling getAll method', async () => {
        const tasks = await spyService.getAll();
        expect(tasks).not.toBe(null);
    });

    it('calling getAll method', () => {
        expect(spyService.getAll).toHaveBeenCalled();
    });

    it('calling getOne method', () => {
        const ClientId = 'Dcmtestdcchua';
        expect(spyService.getByOneOption(ClientId)).toBeUndefined();
    });

    it('calling getOne method', () => {
        const ClientId = '645f38ee-f296-4dc1-a3c1-9d1beee5bdaa';
        expect(spyService.getOneById(ClientId)).not.toBe(null);
    });

    it('calling update method', () => {
        const taskId = 'something';
        const dto: CreateClientDto = new CreateClientDto();
        expect(spyService.update(taskId, dto)).not.toEqual(null);
    });

    it('calling update method', () => {
        const dto: CreateClientDto = new CreateClientDto();
        const ClientId = 'something';
        expect(spyService.update).toHaveBeenCalled();
        expect(spyService.update).toHaveBeenCalledWith(ClientId, dto);
    });
});
