import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>
    ) {}

    async findAllUser() {
        return this.userRepository.find();
    }

    async createUser(userDto: Partial<Omit<UserDto, 'id' | 'refresh_token'>>) {
        const existingUserByEmail = await this.findOneByEmail(userDto.email);
        if (existingUserByEmail) {
            throw new ConflictException('Email already exists');
        }

        const existingUserByUsername = await this.findOneByUsername(userDto.userName);
        if (existingUserByUsername) {
            throw new ConflictException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const user = this.userRepository.create({
            ...userDto,
            password: hashedPassword,
        });
        const response = await this.userRepository.save(user);
        return response
    }

    async findOneByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    async findOneByUsername(username: string) {
        return this.userRepository.findOne({ where: { userName: username } });
    }
}
