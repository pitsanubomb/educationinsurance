import { Module } from '@nestjs/common'
import { Year } from './entities/years.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { YearService } from './services/year.service'
import { JwtToken } from '../share/jwt/jwttoken'
import { YearController } from './controllers/year.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Year])],
  providers: [YearService, JwtToken],
  controllers: [YearController],
})
export class Assessmentmodule {}
