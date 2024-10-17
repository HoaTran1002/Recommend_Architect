import { IsNotEmpty, IsString } from "class-validator";

export class LogoutDto{
    @IsNotEmpty()
    @IsString()
    id: string
}