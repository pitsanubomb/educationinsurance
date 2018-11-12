import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Usergroup } from '../entities/usergroup.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUsergroup } from '../userdto/usergroup.dto'

@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(Usergroup)
    private readonly usergroupRepo: Repository<Usergroup>,
  ) {}

  async create(body: CreateUsergroup) {
    const usergroup = new Usergroup()
    usergroup.name = body.name

    try {
      return await this.usergroupRepo.save(usergroup)
    } catch (error) {
      const e = error.message || 'ไม่สามารถเพิ่มกลุ่มผู้ใช้งานได้'
      throw new HttpException(e, HttpStatus.BAD_GATEWAY)
    }
  }
}
