import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  ValidateIf,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsIn,
  IsBoolean,
  isNumber,
  IsNumber,
} from 'class-validator';
import { SignUpDto } from 'src/modules/auth/dto/sign-up.dto';

export class UserDto extends SignUpDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  @IsOptional()
  address: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  numberPhone: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  refresh_token: string;
}
