import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { usersProviders } from './users.providers'
import { ShareModule } from '../share/share.module'

@Module({
  imports: [ShareModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class Usersmodule {}
