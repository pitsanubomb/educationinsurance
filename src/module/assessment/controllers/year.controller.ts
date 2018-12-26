import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { YearService } from '../services/year.service'
import { JwtToken } from '../../share/jwt/jwttoken'
import { Roles } from '../../share/decorate/role.decorate'
import { CreateNewYearDTO, YearDTO } from '../assessmentdto/years.dto'
import { AuthGuard } from '../../share/auth/auth.guard'

@Controller('year')
@ApiUseTags('year')
@ApiBearerAuth()
export class YearController {
  constructor(
    private readonly yearService: YearService,
    public jwt: JwtToken,
  ) {}

  @Post('addyear')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({
    title: 'เพิ่มปีการศึกษา',
    description: 'เพิ่มปีการศึกษาเพื่อประเมิน',
    operationId: 'Create Years',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: YearDTO,
    description: 'เพิ่มปีการศึกษาสำเร็จ',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: YearDTO,
    description: 'เพิ่มปีการศึกษาสำเร็จ',
  })
  async create(@Body() yearBody: CreateNewYearDTO) {
    try {
      const yearRes = await this.yearService.addYear(yearBody)
      return yearRes.toDTO()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('getallyears')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({
    title: 'ดึงข้อมูลปีการศึกษา',
    description: 'ดึงข้อมูลปีการศึกษาสำหรับการประเมิน',
    operationId: 'Get all years',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ดึงข้อมูลปีการศึกษาสำเร็จ',
  })
  async getallyear() {
    try {
      return this.yearService.getAllYears()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
