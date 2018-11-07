import { CreateUserBody } from '../dtos/users.dto'
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Users } from '../entities/users.entity'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private readonly repo: Repository<Users>,
  ) {}

  async createUser(body: CreateUserBody) {
    const newUser = new Users()
    const salt = await genSalt(10)
    newUser.username = body.username
    newUser.password = await hash(body.password, salt)

    try {
      const user = await this.repo.create(newUser)
      return user
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
