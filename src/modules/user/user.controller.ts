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
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserType } from '../../common/enums/common.enum';
import { PageOptionsDto } from '../../common/pagination/page-option.dto';
import { PageDto } from '../../common/pagination/page.dto';
import RolesGuard from '../auth/roles.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserUserDto } from './dtos/update-role-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';


@Controller('User')
@UseGuards(AuthGuard())
export class UserController {
    constructor(private readonly userService: UserService) { 
    }

    // _______________________________Read_________________________________________
    @Get('get-all')
    async getAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User> | undefined> {
        return await this.userService.getAll(pageOptionsDto);
    }

    @Get('get-all-by-projectId/:projectId')
    async getAllByProjectId(@Param('projectId') projectId: string): Promise<User[] | undefined> {
        return await this.userService.getAllByProjectId(projectId);
    }

    @Get('get-all-by-projectId/:projectId')
    async getAllProjectByUserId(@Param('UserId') UserId: string): Promise<User[] | undefined> {
        return await this.userService.getAllProjectByUserId(UserId);
    }

    @Get('get-one-by-id/:id')
    async getOne(@Param('id') id: string): Promise<User | undefined> {
        return await this.userService.getOneById(id);
    }

    @Get('get-one-by-option/:id')
    async getOneByOption(@Param() option: any): Promise<User | undefined> {
        return await this.userService.getByOneOption(option);
    }

    @Get('get-by-email')
    async getByEmail(@Query() email: string): Promise<User | undefined> {
        return await this.userService.getByEmail(email);
    }

    @Get('get-by-name')
    async getByName(@Query('name') name: string): Promise<User[] | undefined> {
        return await this.userService.getByName(name);
    }

    @Get('deactive/:id')
    @UseGuards(RolesGuard(UserType.Admin))
    async deActiveUser(@Param('id') id: string): Promise<boolean | undefined> {
        return await this.userService.deActiveUser(id);
    }

    @Get('reactive/:id')
    @UseGuards(RolesGuard(UserType.Admin))
    async reActiveUser(@Param('id') id: string): Promise<boolean | undefined> {
        return await this.userService.reActiveUser(id);
    }

    @Get('auto-upload-data')
    @UseGuards(RolesGuard(UserType.Admin))
    async autoUploaData(@Query() amount): Promise<boolean | undefined> {
        return await this.userService.createFakeData(amount.amount);
    }


    // __________________________________Create____________________________________________

    @Post('create')
    @UseGuards(RolesGuard(UserType.Admin))
    async createUser(
        @Body() createUserDto: CreateUserDto,
        @GetUser() user: User
    ): Promise<CreateUserDto | undefined> {
        return await this.userService.createUser(createUserDto, user.id);
    }

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: '../../uploads/avatars'
        })
    }))
    async addAvatar(@UploadedFile() file: Express.Multer.File, @GetUser() user: User) {
        return this.userService.addAvatar(user.id, {
            path: file.path,
            filename: file.originalname,
            mimetype: file.mimetype
        });
    }

    // __________________________________Update____________________________________________
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<CreateUserDto | undefined> {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Patch(':id')
    @UseGuards(RolesGuard(UserType.Admin))
    async updateUserRole(@Param('id') id: string, @Body() role: UpdateUserUserDto): Promise<boolean | undefined> {
        return await this.userService.updateUserRole(id, role);
    }

    @Patch(':id')
    async resetPassword(@Param('id') id: string, @Body() password: string): Promise<boolean | undefined> {
        return await this.userService.resetPassword(id, password);
    }

    // ___________________________________Delete___________________________________________
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.delete(id);
    }

}
