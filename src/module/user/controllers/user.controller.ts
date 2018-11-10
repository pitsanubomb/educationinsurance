import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { UserService } from '../services/user.service'
import { CreateUserDTO, UserDTO } from '../userdto/user.dto'
import { JwtToken } from '../../sharemodule/jwt/jwttoken'
import { AuthGuard } from '../../sharemodule/auth/auth.guard'
import { Roles } from 'src/module/sharemodule/decorate/role.decorate'

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
}
