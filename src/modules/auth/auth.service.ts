/* eslint-disable prettier/prettier */
import {
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
  ) { }

  async login(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string } | undefined> {

    const { email, password } = authCredentialDto;

    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error('User Not Found');
      }

      const isValidPsw: boolean = this.helper.isValidPsw(
        password,
        user.password,
      );

      if (!isValidPsw) {
        throw new Error('Wrong password');
      }

      this.userRepository.update(user.id, { lastLoginAt: new Date() });

      const payload: JwtPayload = { email: user.email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };

    } catch (error) {
      throw new HttpException(`Something went wrong: ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
