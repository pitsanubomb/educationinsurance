import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../userdto/user.dto';

@Injectable()

export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepo: Repository<User>) { }

    async createUser(body: CreateUserDTO) {

        const { username, password } = body

        if (!username) {
            throw new HttpException({ message: 'ไม่สามารถเพิ่มผู้ใช้งานได้', username: 'กรุณากรอกชื่อผู้ใช้งาน' }, HttpStatus.BAD_REQUEST)
        }

        if (!password) {
            throw new HttpException({ message: 'ไม่สามารถเพิ่มผู้ใช้งานได้', username: 'กรุณากรอกรหัสผ่าน' }, HttpStatus.BAD_REQUEST)
        }

        const newUser = new User()
        newUser.username = username
        newUser.password = password

        try {
            const user = await this.userRepo.save(newUser)
            return user
        } catch (error) {
            throw new HttpException({ message: 'ไม่สามารถเพิ่มผู้ใช้งานได้', error }, HttpStatus.BAD_REQUEST)
        }
    }
}