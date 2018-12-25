import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDTO } from '../userdto/user.dto'
import { genSalt, hash, compare } from 'bcrypt'
import { Usergroup } from '../entities/usergroup.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(body: CreateUserDTO) {
    const { username, password } = body

    if (!username) {
      throw new HttpException(
        {
          message: 'ไม่สามารถเพิ่มผู้ใช้งานได้',
          username: 'กรุณากรอกชื่อผู้ใช้งาน',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    if (!password) {
      throw new HttpException(
        {
          message: 'ไม่สามารถเพิ่มผู้ใช้งานได้',
          username: 'กรุณากรอกรหัสผ่าน',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const newUser = new User()
    newUser.username = username
    const salt = await genSalt(10)
    newUser.password = await hash(password, salt)
    newUser.usergroup = new Usergroup(body.groupId)
    try {
      const user = await this.userRepo.save(newUser)
      return user
    } catch (error) {
      throw new HttpException(
        { message: 'ไม่สามารถเพิ่มผู้ใช้งานได้', error },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getAllusers() {
    const users = await this.userRepo.find({ relations: ['usergroup'] })
    return users
  }

  async getUserbyUsergroup(id: number) {
    const users = await this.userRepo.find({
      relations: ['usergroup'],
      where: { usergroup: id },
    })
    if (users !== null && users.length !== 0) {
      return users
    } else {
      return 'ไม่พบผู้ใช้งานที่มีสิทธิ์นี้ในระบบ'
    }
  }

  async getUserbyUsername(_username: string) {
    const user = await this.userRepo.findOne({ username: _username })
    return user
  }

  async loginUser($username: string, $password: string) {
    const user = await this.getUserbyUsername($username)
    if (!user) {
      throw new HttpException('ไม่พบผู้ใช้งานคะ', HttpStatus.BAD_REQUEST)
    }

    const isMath = await compare($password, user.password)

    if (!isMath) {
      throw new HttpException(
        'รหัสผ่านผิดกรุณาใส่รหัสผ่านใหม่อีกครั้งคะ',
        HttpStatus.BAD_REQUEST,
      )
    }
    try {
      const res = await this.userRepo.findOne({
        where: {
          username: $username,
          password: user.password,
        },
        relations: ['usergroup'],
      })
      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
