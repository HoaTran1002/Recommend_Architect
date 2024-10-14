import { IsString, MinLength, MaxLength, Matches, ValidateIf, IsNotEmpty, IsEmail, IsOptional, IsIn } from "class-validator";
import { Role } from "src/role/entities/role.entity";

export class SignUpDto {

    @IsEmail({}, { message: 'Email is invalid' }) 
    email: string;

    @MinLength(4)
    @MaxLength(40)
    @IsString()
    userName: string;

    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
    password: string;

    @MinLength(4)
    @MaxLength(20)
    @IsString()
    @IsNotEmpty({ message: 'Password confirmation is required' })
    @ValidateIf(o => o.password)
    passwordConfirm: string;

    @IsOptional() 
    @IsIn(['user', 'admin'], { message: 'Role must be one of the following: user, admin, moderator' })
    role: Role;

    validatePasswordConfirm() {
        return this.password === this.passwordConfirm;
    }
}
