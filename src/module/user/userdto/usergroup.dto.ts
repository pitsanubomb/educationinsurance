import { ApiModelProperty } from '@nestjs/swagger'

export class UsergroupDTO {
  @ApiModelProperty({ description: 'ชื่อกลุ่มผู้ใช้งาน', example: 'admin' })
  readonly name: string
}

export class CreateUsergroup {
  @ApiModelProperty({ description: 'ชื่อกลุ่มผู้ใช้งาน', example: 'admin' })
  readonly name: string
}
