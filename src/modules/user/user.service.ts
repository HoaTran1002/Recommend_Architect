import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { RoleService } from 'src/modules/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Model<User>,
    private readonly roleService: RoleService,
  ) {}
  async hello() {
    return 'hello word!';
  }
  async createUser(userDto: Partial<Omit<UserDto, 'id' | 'refresh_token'>>) {
    const existingUserByEmail = await this.findOneByEmail(userDto.email);
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUserByUsername = await this.findOneByUsername(
      userDto.userName,
    );
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    const role = userDto.role?.name || 'user';
    const existingRole = await this.roleService.findOneByName(role);
    if (!existingRole) {
      throw new ConflictException(`Role '${role}' does not exist`);
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = new this.userRepository({
      ...userDto,
      role: existingRole._id,
      password: hashedPassword,
    });
    const record = await user.save();
    return record;
  }

  async deleteRefreshToken(id: string) {
    const user = await this.findOneByUserId(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.refresh_token = null;
    return await user.save();
  }

  async updateUserRefreshToken(id: string, refreshToken: string) {
    const user = await this.findOneByUserId(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.refresh_token = refreshToken;
    return await user.save();
  }

  async updateUser(id: string, user: Omit<User, 'id'>) {
    const existingUser = await this.findOneByUserId(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(existingUser, user);
    return await existingUser.save();
  }

  async findRefreshTokenById(id: string) {
    const user = await this.findOneByUserId(id);
    const response = user.refresh_token;
    return response;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const response = await this.userRepository.findOne({ email });
    return response;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const response = await this.userRepository.findOne({ userName: username });
    return response;
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    const objectId = new mongoose.Types.ObjectId(userId);
    const response = await this.userRepository.findOne({ _id: objectId });
    return response;
  }

  async findAllUser() {
    const response = await this.userRepository.find();
    return response;
  }
  async findUserById(id: string): Promise<User> {
    const objectId = new mongoose.Types.ObjectId(id); // Chuyển đổi ID thành ObjectId
    const user = await this.userRepository.findById(objectId).exec(); // Sử dụng userRepository để tìm kiếm
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
