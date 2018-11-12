import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { JwtToken } from '../sharemodule/jwt/jwttoken'
import { Usergroup } from './entities/usergroup.entity'
import { UserGroupService } from './services/usergroup.service'
import { UserGroupController } from './controllers/usergroup.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, Usergroup])],
  providers: [UserService, UserGroupService, JwtToken],
  controllers: [UserController, UserGroupController],
})
export class Usermodule {}
