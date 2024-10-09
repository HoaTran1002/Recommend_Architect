import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
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
    async updateUserRefreshToken(id:string,refreshToken:string){
        const record = await this.findOneByUserId(id)
        record.refresh_token = refreshToken
        const response = await this.updateUser(record.id,record)
        return response
    }
    async updateUser(id:string,user:Omit<User,'id'>){
        await this.findOneByUserId(id)
        const response = await this.userRepository.update(id,user)
        return response 
    }
    async findOneByEmail(email: string):Promise<User> {
            const response = await this.userRepository.findOne({ where: { email } });
            return response

    }

    async findOneByUsername(username: string):Promise<User> {
            const response = await this.userRepository.findOne({ where: { userName: username } });            
            return response      

    }

    async findOneByUserId(userId: string):Promise<User> {
            const response = await this.userRepository.findOne({ where: { id: userId } });           
            return response

    }

    async findAllUser() {
        return this.userRepository.find();
    }
}
