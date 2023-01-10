import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthCredentialDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
