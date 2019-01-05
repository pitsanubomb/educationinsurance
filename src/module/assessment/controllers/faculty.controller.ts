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
  import { JwtToken } from '../../share/jwt/jwttoken'
  import { Roles } from '../../share/decorate/role.decorate'
  import { AuthGuard } from '../../share/auth/auth.guard'
import { FacultyService } from '../services/faculty.service';
import { FacultyDTO } from '../assessmentdto/faculty.dto';
  
  @Controller('faculty')
  @ApiUseTags('faculty')
  @ApiBearerAuth()
  export class FacultyController {
    constructor(
      private readonly facultyService: FacultyService,
      public jwt: JwtToken,
    ) {}
  
    @Post('addfaculty')
    @UseGuards(AuthGuard)
    @Roles('admin')
    @ApiOperation({
      title: 'เพิ่มคณะ',
      description: 'เพิ่มคณะ',
      operationId: 'Create Faculty',
    })
    @ApiResponse({
      status: HttpStatus.OK,
      type: FacultyDTO,
      description: 'เพิ่มปีการศึกษาสำเร็จ',
    })
    @ApiResponse({
      status: HttpStatus.CREATED,
      type: FacultyDTO,
      description: 'เพิ่มปีการศึกษาสำเร็จ',
    })
    async create(@Body() facultyBody: FacultyDTO) {
      try {
        const facultyRes = await this.facultyService.addFaculty(facultyBody)
        return facultyRes.toDTO()
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      }
    }
  
    @Get('getallfacultys')
    @UseGuards(AuthGuard)
    @Roles('admin')
    @ApiOperation({
      title: 'ดึงข้อมูลคณะทั้งหมด',
      description: 'ดึงข้อมูลคณะทั้งหมด',
      operationId: 'Get all faculty',
    })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'ดึงข้อมูลคณะสำเร็จ',
    })
    async getallyear() {
      try {
        return this.facultyService.getAllFaculty()
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      }
    }
  }
  