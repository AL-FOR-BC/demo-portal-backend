import { IsEmail, Length } from 'class-validator';

export class CreateUserInput {
    @IsEmail()
    email: string;

    @Length(6, 128)
    password: string;

}

export class UserLoginInput {
    @IsEmail()
    email: string;

    @Length(6, 128)
    password: string;
}

export interface UserPayload {
    id: string;
    email: string;
    verified: boolean;
}