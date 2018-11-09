import { ApiModelProperty } from '@nestjs/swagger'
import { UserGroup } from '../entities/usergroup'
import { UsergroupDTO } from './usergroup.dto'

export class UserDTO {
  @ApiModelProperty()
  readonly username: string

  @ApiModelProperty({
    description: 'กลุ่มผู้ใช้งาน',
    example: 'admin',
    type: UsergroupDTO,
  })
  readonly usergroup: UsergroupDTO
}

export class CreateUserDTO {
  @ApiModelProperty({
    description: 'ชื่อผู้ใช้งาน',
    example: 'admin',
    minimum: 4,
  })
  readonly username: string

  @ApiModelProperty()
  readonly password: string
}
