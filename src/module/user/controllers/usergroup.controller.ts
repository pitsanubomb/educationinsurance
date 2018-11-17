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
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { UserGroupService } from '../services/usergroup.service'
import { CreateUsergroup, UsergroupDTO } from '../userdto/usergroup.dto'
import { AuthGuard } from '../../share/auth/auth.guard';

@Controller('usergroup')
@ApiUseTags('Usergroup')
@ApiBearerAuth()
export class UserGroupController {
  constructor(private readonly usergroupService: UserGroupService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    title: 'เพิ่มกลุ่มผู้ใช้งาน',
    description: 'เพิ่มกลุ่มผู้ใช้งานให้ผู้ใช้เพื่อกำหนดสิทธิ์',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UsergroupDTO,
    description: 'เพิ่มกลุ่มผู้ใช้งานสำเร็จ',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'ไม่สามารถเพิ่มกลุ่มผู้ใช้งานได้',
  })
  async create(@Body() body: CreateUsergroup) {
    try {
      const res = await this.usergroupService.create(body)
      return res.toDto()
    } catch (error) {
      throw new HttpException(
        'ไม่สามารถเพิ่มกลุ่มผู้ใช้งานได้',
        HttpStatus.BAD_GATEWAY,
      )
    }
  }
}
