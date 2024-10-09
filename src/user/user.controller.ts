import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userServices: UserService){}
    @Get('all')
    async getAll(){
        return await this.userServices.findAllUser()
    }
}
