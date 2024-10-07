import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class SignUpDto {
    @MinLength(4)
    @MaxLength(40)
    @IsString()
    username: string;

    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @Matches('password')
    passwordConfirm: string;
}