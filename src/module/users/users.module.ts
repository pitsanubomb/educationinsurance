import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { ShareModule } from '../share/share.module'
import { usersProviders } from './users.providers'

@Module({
  imports: [ShareModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})
export class Usersmodule {}
