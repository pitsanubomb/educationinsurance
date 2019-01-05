import { Module } from '@nestjs/common'
import { Year } from './entities/years.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { YearService } from './services/year.service'
import { JwtToken } from '../share/jwt/jwttoken'
import { YearController } from './controllers/year.controller'
import { FacultyService } from './services/faculty.service';
import { FacultyController } from './controllers/faculty.controller';
import { Faculty } from './entities/faculty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Year,Faculty])],
  providers: [FacultyService,YearService, JwtToken],
  controllers: [YearController,FacultyController],
  exports: [FacultyService],
})
export class Assessmentmodule {}
