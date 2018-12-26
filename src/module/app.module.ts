import { Module } from '@nestjs/common'
import { Connection } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Usermodule } from './user/user.module'
import { Assessmentmodule } from './assessment/assessment.module'

@Module({
  imports: [TypeOrmModule.forRoot(), Usermodule, Assessmentmodule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
