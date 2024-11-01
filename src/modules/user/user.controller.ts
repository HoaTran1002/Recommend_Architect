import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}
  @UseGuards(AuthGuard)
  // @SetMetadata('roles', ['admin', 'instructor'])
  @Roles('user')
  @Get('all')
  async getAll() {
    return await this.userServices.findAllUser();
  }
  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return await this.userServices.findUserById(id);
  }
}
