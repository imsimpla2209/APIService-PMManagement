/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';


@Injectable()
export class AuthHelper {

    private logger = new Logger('AuthHelper');

    @InjectRepository(User)
    private readonly repository: Repository<User>;

    private readonly jwt: JwtService;

    constructor(jwt: JwtService) {
        this.jwt = jwt;
    }

    // Decoding the JWT Token
    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    // Get Account by Account ID we get from decode()
    public async validateUser(decoded: any): Promise<User> {
        return await this.repository.findOne({
            where: {
                email: decoded.email
            }
        });
    }

    // Generate JWT Token
    public generateToken(user: User): string {

        this.logger.debug(`Generated JWT Token`);

        const accessToken = this.jwt.sign({ email: user.email });
        return accessToken;

    }

    // Validate Account's password
    public isValidPsw(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    // Encode Account's password
    public encodePsw(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    private async validate(token: string): Promise<boolean | undefined> {
        const decoded: unknown = this.jwt.verify(token);

        if (!decoded) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        const user: User = await this.validateUser(decoded);

        if (!user) {
            throw new UnauthorizedException();
        }

        return true;
    }
}