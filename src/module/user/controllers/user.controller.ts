import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDTO, UserDTO } from '../userdto/user.dto';

@Controller('user')
@ApiUseTags('User')

export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    @ApiOperation({ title: 'เพิ่มผู้ใช้งาน', description: 'เพิ่มผู้ใช้งานเพื่อเข้าใช้งานระบบ', operationId: 'Create Users' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDTO, description: 'เพิ่มผู้ใช้งานสำเร็จ' })
    async create(@Body() userBody: CreateUserDTO) {
        try {
            const userRes = await this.userService.createUser(userBody)
            return userRes.toDto()

        } catch (error) {
            throw new HttpException({ message: 'ไม่สามารถเพิ่มผู้ใช้งานได้' }, HttpStatus.BAD_REQUEST)
        }
    }
}