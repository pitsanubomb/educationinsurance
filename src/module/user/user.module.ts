import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { JwtToken } from '../sharemodule/jwt/jwttoken'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtToken],
  controllers: [UserController],
})
export class Usermodule {}
