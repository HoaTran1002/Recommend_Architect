import { UserDto } from "src/user/dto/user.dto"

export interface JwtPayload extends Pick<UserDto,'id'|'userName' | 'email'| 'role'>{

}