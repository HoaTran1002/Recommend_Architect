import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Model } from 'mongoose';
import { ROLE_REPOSITORY } from 'src/utils/constants/services.constants';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.roleRepository.findOne({
      name: createRoleDto.name,
    });
    if (existingRole) {
      throw new ConflictException(
        `Role with name ${createRoleDto.name} already exists`,
      );
    }

    const newRole = new this.roleRepository(createRoleDto);
    return await newRole.save();
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: any) {
    const record = await this.roleRepository.findById(id);
    if (!record) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return record;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const record = await this.roleRepository.findByIdAndUpdate(
      id,
      updateRoleDto,
      { new: true },
    );
    if (!record) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return record;
  }

  async remove(id: string) {
    const record = await this.roleRepository.findByIdAndDelete(id);
    if (!record) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return { message: `Role with id ${id} has been removed` };
  }

  async findOrCreateDefaultRoles() {
    const roles = ['user', 'admin'];

    for (const roleName of roles) {
      const existingRole = await this.roleRepository.findOne({
        name: roleName,
      });
      if (!existingRole) {
        const newRole = new this.roleRepository({ name: roleName });
        await newRole.save();
      }
    }
  }

  async findOneByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findOne({ name });
  }
}
