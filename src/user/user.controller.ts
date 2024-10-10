import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/guard/role.gaurd';

@Controller('user')
export class UserController {
    constructor(private readonly userServices: UserService){}
    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard)
    @Get('all')
    async getAll(){
        return await this.userServices.findAllUser()
    }
}
