import { Module } from '@nestjs/common'
import { Usersmodule } from './users/users.module'

@Module({
  imports: [Usersmodule],
})
export class AppModule {}
