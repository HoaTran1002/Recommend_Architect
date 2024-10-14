import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { ROLE_REPOSITORY } from 'src/common/services';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: Repository<Role>
  ){

  }
  async create(createRoleDto: CreateRoleDto) {
    const record = this.roleRepository.create(createRoleDto)
    const response = await this.roleRepository.save(record)
    return response
  }

  async findAll() {
    const response = await this.roleRepository.find()
    return response
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
  async findOrCreateDefaultRoles() {
    const roles = ['user', 'admin', 'instructor'];

    for (const roleName of roles) {
      const existingRole = await this.roleRepository.findOne({ where: { name: roleName } });
      if (!existingRole) {
        const newRole = this.roleRepository.create({ name: roleName });
        await this.roleRepository.save(newRole);
      }
    }
  }
  async findOneByName(name: string): Promise<Role | undefined> {
    const record = this.roleRepository.findOne({ where: { name } });
    return record
  }
}
