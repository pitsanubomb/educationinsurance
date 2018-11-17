import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { Usergroup } from './entities/usergroup.entity'
import { UserGroupService } from './services/usergroup.service'
import { UserGroupController } from './controllers/usergroup.controller'
import { JwtToken } from '../share/jwt/jwttoken';

@Module({
  imports: [TypeOrmModule.forFeature([User, Usergroup])],
  providers: [UserService, UserGroupService, JwtToken],
  controllers: [UserController, UserGroupController],
})
export class Usermodule {}
