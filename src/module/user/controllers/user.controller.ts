import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { UserService } from '../services/user.service'
import { CreateUserDTO, UserDTO, AddfacultyDTO } from '../userdto/user.dto'
import { JwtToken } from '../../share/jwt/jwttoken'
import { AuthGuard } from '../../share/auth/auth.guard'
import { Roles } from '../../share/decorate/role.decorate'

@Controller('user')
@ApiUseTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    public jwt: JwtToken,
  ) {}

  @Post('register')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({
    title: 'เพิ่มผู้ใช้งาน',
    description: 'เพิ่มผู้ใช้งานเพื่อเข้าใช้งานระบบ',
    operationId: 'Create Users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO,
    description: 'เพิ่มผู้ใช้งานสำเร็จ',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserDTO,
    description: 'เพิ่มผู้ใช้งานสำเร็จ',
  })
  async create(@Body() userBody: CreateUserDTO) {
    const user = await this.userService.getUserbyUsername(userBody.username)
    if (user) {
      throw new HttpException(
        'มีชื่อผู้ใช้งานอยู่แล้วไม่สามารถ เพิ่มผู้ใช้งานได้',
        HttpStatus.BAD_REQUEST,
      )
    }
    try {
      const userRes = await this.userService.createUser(userBody)
      return userRes.toDto()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('login')
  @ApiOperation({
    title: 'เข้าสู่ระบบ',
    description: 'เข้าสู่ระบบเพื่อใช้งาน และ ได้สิทธิ์',
    operationId: 'Login User',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO,
    description: 'เข้าสู่ระบบสำเร็จ',
  })
  async login(@Body() userBody: CreateUserDTO) {
    try {
      const loginRes = await this.userService.loginUser(
        userBody.username,
        userBody.password,
      )
      const jwt = await this.jwt.genToken(loginRes)
      return {
        user: loginRes,
        token: jwt,
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('addfaculty')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({
    title: 'เพิ่มคณะให้ผู้ใช้',
    description: 'เพิ่มคณะให้ผู้ใช้เพื่อประเมิน และ ตรวจการประเมิน',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO,
    description: 'เพิ่มคณะให้ผู้ใช้สำเร็จ',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserDTO,
    description: 'เพิ่มคณะให้ผู้ใช้สำเร็จ',
  })
  async addfaculty(@Body() dataBody: AddfacultyDTO) {
    try {
      this.userService.addfaculty(dataBody)
      return this.userService.getUserbyUsername(dataBody.username)
    } catch (error) {
      throw new HttpException('ไม่สามารถบันทึกข้อมูลได้คะ กรุณาลองอีกครัง', HttpStatus.BAD_REQUEST)
    }
  }

  @Get('allusers')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({
    title: 'ดึงข้อมูลผู้ใช้ทั้งหมด',
    description: 'ดึงข้อมูลผู้ใช้ทั้งหมดในระบบ',
    operationId: 'Get All Users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ดึงข้อมูลผู้ใช้ทั้งหมดสำเร็จ',
  })
  async getallusers() {
    try {
      return await this.userService.getAllusers()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('allusersbygroup/:groupid')
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({
    title: 'ดึงข้อมูลผู้ใช้ทั้งหมดตาม กลุ่มผู้ใช้',
    description: 'ดึงข้อมูลผู้ใช้ทั้งหมดตาม กลุ่มผู้ใช้',
    operationId: 'Get All Users By group',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ดึงข้อมูลผู้ใช้ทั้งหมดสำเร็จ',
  })
  async getallusersbygroup(@Param('groupid') id: number) {
    try {
      return await this.userService.getUserbyUsergroup(id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
