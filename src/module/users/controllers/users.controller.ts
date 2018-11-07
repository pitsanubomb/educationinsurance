import {
  Post,
  Body,
  HttpException,
  HttpStatus,
  Controller,
  HttpCode,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiUseTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { UsersDTO, CreateUserBody } from '../dtos/users.dto'
import { UsersService } from '../services/users.service'

@ApiBearerAuth()
@Controller('user')
@ApiUseTags('User')
export class UsersController {
  constructor(private readonly usv: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ title: 'สร้างผู้ใช้ใหม่', operationId: 'create_users' })
  @ApiResponse({ status: 201, type: UsersDTO, description: 'Successful' })
  @ApiResponse({ status: 'default' as any, description: 'Failure' })
  async create(@Body() body: CreateUserBody) {

    if (!body.username) {
      throw new HttpException('Username is required ', HttpStatus.BAD_REQUEST)
    }

    if (!body.username) {
      throw new HttpException('Password is required ', HttpStatus.BAD_REQUEST)
    }

    const newUser = await this.usv.createUser(body)
    return newUser.toDTO()
  }
}
